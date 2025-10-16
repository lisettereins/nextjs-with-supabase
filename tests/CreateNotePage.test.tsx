import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import CreateNotePage from "@/app/notes/create/page";

const mockRouter = { push: vi.fn(), refresh: vi.fn() };
const mockSupabase = {
  from: vi.fn(() => ({
    insert: vi.fn().mockResolvedValue({ data: [{ id: 1 }], error: null }),
  })),
};

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => mockSupabase,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("<CreateNotePage />", () => {
  it("submits and redirects", async () => {
    render(<CreateNotePage />);

    fireEvent.change(screen.getByPlaceholderText("Note title"), {
      target: { value: "New note" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith("notes");
      expect(mockRouter.push).toHaveBeenCalledWith("/notes");
    });
  });
});
