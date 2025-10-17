import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BooksList from "@/app/books/BooksList";


vi.mock("./actions", () => ({ deleteBook: vi.fn(() => Promise.resolve(true)) }));
import { deleteBook } from "@/app/books/actions";

describe("BooksList", () => {
  const books = [
    { id: "1", title: "Book 1" },
    { id: "2", title: "Book 2" },
  ];

  beforeEach(() => vi.clearAllMocks());

  it("renders books", () => {
    render(<BooksList books={books} />);
    expect(screen.getByText("Book 1")).toBeDefined();
    expect(screen.getByText("Book 2")).toBeDefined();
  });

  it("deletes a book on confirm", async () => {
    window.confirm = vi.fn(() => true);
    render(<BooksList books={books} />);
    
    await userEvent.click(screen.getAllByText("🗑️")[0]);

    expect(deleteBook).toHaveBeenCalledWith("1");
    expect(screen.queryByText("Book 1")).toBeNull();
  });

  it("does not delete if confirm canceled", async () => {
    window.confirm = vi.fn(() => false);
    render(<BooksList books={books} />);
    
    await userEvent.click(screen.getAllByText("🗑️")[0]);
    expect(deleteBook).not.toHaveBeenCalled();
    expect(screen.getByText("Book 1")).toBeDefined();
  });
});
