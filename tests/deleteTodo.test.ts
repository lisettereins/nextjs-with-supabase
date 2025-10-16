import { vi, describe, it, expect } from "vitest";
import { deleteTodo } from "@/app/todos/delete/deleteTodo";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null })),
      })),
    })),
  })),
}));

describe("deleteTodo", () => {
  it("should call Supabase delete correctly", async () => {
    const result = await deleteTodo("123");
    expect(result).toEqual({ success: true });
  });
});
