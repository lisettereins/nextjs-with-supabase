import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBookForm from "@/app/books/create/CreateBookForm";

vi.mock("@/app/books/actions", () => ({ createBook: vi.fn(() => Promise.resolve(true)) }));
import { createBook } from "@/app/books/actions";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

describe("CreateBookForm", () => {
  it("creates a book on submit", async () => {
    const book = { id: "0", title: "" };
    const { getByPlaceholderText, getByText } = render(<CreateBookForm book={book} />);

    const input = getByPlaceholderText("Book title") as HTMLInputElement;
    await userEvent.type(input, "My New Book");
    await userEvent.click(getByText("Save"));

    expect(createBook).toHaveBeenCalledWith("My New Book");
  });
});
