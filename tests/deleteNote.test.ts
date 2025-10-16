import { vi, describe, it, expect } from "vitest";
import { deleteNote } from "@/app/notes/actions/deleteNote";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null })),
      })),
    })),
  })),
}));

describe("deleteNote", () => {
  it("should call Supabase delete correctly", async () => {
    const result = await deleteNote("123");
    expect(result).toEqual({ success: true });
  });
});
