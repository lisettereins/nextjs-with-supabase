import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import NotesPage from "@/app/notes/page";

const mockDelete = vi.fn();
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn().mockResolvedValue({
      data: [
        { id: "1", title: "First note" },
        { id: "2", title: "Second note" },
      ],
    }),
  })),
};

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => mockSupabase,
}));

vi.mock("@/app/notes/actions/deleteNote", () => ({
  deleteNote: (id: string) => mockDelete(id),
}));

describe("<Page />", () => {
  it("renders notes and handles delete", async () => {
    render(<NotesPage />);

    const firstNote = await screen.findByText("First note");
    expect(firstNote).toBeInTheDocument();

    window.confirm = vi.fn(() => true);
    const deleteButton = screen.getAllByText("🗑️")[0];
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
