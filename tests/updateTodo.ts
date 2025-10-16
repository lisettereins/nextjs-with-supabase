import { vi, describe, it, expect } from "vitest";
import { updateTodo } from "@/app/todos/[id]/edit/action";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null })),
      })),
    })),
  })),
}));

describe("updateTodo", () => {
  it("should call Supabase update correctly", async () => {
    const result = await updateTodo("123", "updatedTitle");
    expect(result).toEqual({ success: true });
  });
});