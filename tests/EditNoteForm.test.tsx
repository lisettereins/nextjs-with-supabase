import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EditNoteForm from "@/app/notes/[id]/edit/EditNoteForm";


const mockUpdateNote = vi.fn().mockResolvedValue({ success: true });
vi.mock("@/app/notes/[id]/edit/actions", () => ({
  updateNote: (id: string, title: string) => mockUpdateNote(id, title),
}));


const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<EditNoteForm />", () => {
  const note = { id: "123", title: "Original title" };

  it("renders the input with initial value", () => {
    render(<EditNoteForm note={note} />);
    expect(screen.getByPlaceholderText("Edit title...")).toHaveValue(
      "Original title"
    );
  });

  it("updates the title and calls updateNote and router.push on submit", async () => {
    render(<EditNoteForm note={note} />);

    
    fireEvent.change(screen.getByPlaceholderText("Edit title..."), {
      target: { value: "Updated title" },
    });

    
    fireEvent.submit(screen.getByRole("button", { name: /save changes/i }));

    
    await waitFor(() => {
      expect(mockUpdateNote).toHaveBeenCalledWith("123", "Updated title");
      expect(mockPush).toHaveBeenCalledWith("/notes");
    });
  });
});
