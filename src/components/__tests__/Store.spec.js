import { setActivePinia, createPinia } from "pinia";
import { useAppStore } from "@/store/app.ts";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const todo = {
  id: 123,
  title: "My title",
  body: "A body",
  color: "#FF0000",
  user_id: 1,
  done: true,
};

describe("Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia({ createSpy: vi.fn() }));
    fetchMocker.mockIf(/^http:\/\/localhost\/api\/todo.*$/, (req) => {
      // Update
      if (req.method === "PUT") {
        return {
          status: 200,
          body: JSON.stringify(todo),
        };
      }
      // Delete
      if (req.method === "DELETE") {
        return {
          status: 200,
          body: "1",
        };
      }

      // Create
      if (req.method === "POST") {
        return {
          status: 201,
          body: JSON.stringify(todo),
        };
      }
    });
  });

  test("logout_button_should_reset_state", () => {
    const store = useAppStore();
    store.bucket = [todo];
    store.token = "anystring";
    expect(store.bucket).toEqual([todo]);
    store.logout();
    expect(store.bucket).toEqual([]);
    expect(store.token).toBe(null);
  });

  test("addTodo_should_call_fetch", async () => {
    const store = useAppStore();
    await store.addTodo(todo);
    await store.addTodo(todo);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test("deleteTodo_should_call_fetch_bucket_should_be_empty", async () => {
    const store = useAppStore();
    store.bucket.push(todo);
    await store.deleteTodo(todo.id);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(store.bucket).toEqual([]);
  });

  test("updateTodo_should_call_fetch_and_bucket_should_be_modified", async () => {
    const store = useAppStore();
    store.bucket.push(todo);
    await store.updateTodo({ ...todo, color: "#FFFFFF" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(store.bucket[0]).toHaveProperty("color", "#FFFFFF");
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
