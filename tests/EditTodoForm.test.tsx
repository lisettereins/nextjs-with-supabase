import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EditTodoForm from "@/app/todos/[id]/edit/EditTodoForm";


const mockUpdateTodo = vi.fn().mockResolvedValue({ success: true });
vi.mock("@/app/todos/[id]/edit/actions", () => ({
  updateTodo: (id: string, name: string) => mockUpdateTodo(id, name),
}));


const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<EditTodoForm />", () => {
  const todo = { id: "123", name: "Original title" };

  it("renders the input with initial value", () => {
    render(<EditTodoForm todo={todo} />);
    expect(screen.getByPlaceholderText("Edit title...")).toHaveValue(
      "Original title"
    );
  });

  it("updates the title and calls updateTodo and router.push on submit", async () => {
    render(<EditTodoForm todo={todo} />);

    
    fireEvent.change(screen.getByPlaceholderText("Edit title..."), {
      target: { value: "Updated title" },
    });

    
    fireEvent.submit(screen.getByRole("button", { name: /save changes/i }));

    
    await waitFor(() => {
      expect(mockUpdateTodo).toHaveBeenCalledWith("123", "Updated title");
      expect(mockPush).toHaveBeenCalledWith("/todos");
    });
  });
});
