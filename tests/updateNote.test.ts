import { vi, describe, it, expect } from "vitest";
import { updateNote } from "@/app/notes/[id]/edit/actions";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null })),
      })),
    })),
  })),
}));

describe("updateNote", () => {
  it("should call Supabase update correctly", async () => {
    const result = await updateNote("123", "updatedTitle");
    expect(result).toEqual({ success: true });
  });
});