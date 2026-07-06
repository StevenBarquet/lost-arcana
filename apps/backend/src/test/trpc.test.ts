import { describe, expect, it } from "vitest";
import { appRouter } from "../trpc/app.router";
import { createCallerFactory } from "../trpc/trpc";

// Caller server-side: ejercita los procedures sin levantar HTTP.
const createCaller = createCallerFactory(appRouter);
const caller = createCaller({ req: {} as never, res: {} as never });

describe("trpc items router", () => {
  it("list returns the mock items", async () => {
    const items = await caller.items.list();
    expect(items.length).toBeGreaterThanOrEqual(2);
    // superjson: createdAt debe ser un Date real, no string.
    expect(items[0].createdAt).toBeInstanceOf(Date);
  });

  it("create adds an item and returns it", async () => {
    const created = await caller.items.create({ name: "Test item" });
    expect(created.name).toBe("Test item");
    expect(created.id).toBeDefined();
  });

  it("create rejects empty name (zod validation)", async () => {
    await expect(caller.items.create({ name: "" })).rejects.toThrow();
  });
});
