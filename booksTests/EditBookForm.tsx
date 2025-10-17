import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditBookForm from "@/app/books/[id]/edit/EditBookForm";


vi.mock("@/app/books/actions", () => ({ updateBook: vi.fn(() => Promise.resolve(true)) }));
import { updateBook } from "@/app/books/actions";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("EditBookForm", () => {
  const book = { id: "1", title: "Old Title" };
  it("edits and submits book", async () => {
    const { getByPlaceholderText, getByText } = render(<EditBookForm book={book} />);
    const input = getByPlaceholderText("Edit title...") as HTMLInputElement;

    await userEvent.clear(input);
    await userEvent.type(input, "New Title");
    await userEvent.click(getByText("Save changes"));

    expect(updateBook).toHaveBeenCalledWith("1", "New Title");
  });
});
