import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TodosPage from "@/app/todos/page";

const mockDelete = vi.fn();
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn().mockResolvedValue({
      data: [
        { id: "1", name: "First todo" },
        { id: "2", name: "Second todo" },
      ],
    }),
  })),
};

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => mockSupabase,
}));

vi.mock("@/app/notes/actions/deleteNote", () => ({
  deleteTodo: (id: string) => mockDelete(id),
}));

describe("<Page />", () => {
  it("renders todos and handles delete", async () => {
    render(<TodosPage />);

    const firstTodo = await screen.findByText("First todo");
    expect(firstTodo).toBeInTheDocument();

    window.confirm = vi.fn(() => true);
    const deleteButton = screen.getAllByText("🗑️")[0];
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
