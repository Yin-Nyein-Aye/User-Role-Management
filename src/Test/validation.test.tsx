import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useCreateData } from "../hooks/useCreateData";
import * as dataService from "../features/data/dataService";

vi.mock("../features/data/dataService", () => ({
  createItem: vi.fn(),
  updateItem: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  return { queryClient, wrapper };
};

describe("useCreateData - Validation & Security", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================
  // PAYLOAD VALIDATION
  // ==========================

  it("does not call API when payload data is empty", async () => {
    const endpoint = "products";
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({ data: {} });
    });

    expect(dataService.createItem).not.toHaveBeenCalled();
  });

  it("does not call updateItem when id is invalid", async () => {
    const endpoint = "products";
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        id: "abc" as any,
        data: { name: "Invalid" },
      });
    });
    expect(dataService.updateItem).not.toHaveBeenCalled();
  });

  // ==========================
  // MALFORMED DATA PROTECTION
  // ==========================

  it("does not update cache if server returns null", async () => {
    const endpoint = "products";
    (dataService.createItem as any).mockResolvedValue(null);

    const { queryClient, wrapper } = createWrapper();

    queryClient.setQueryData([endpoint], {
      products: [{ id: 1, name: "Safe" }],
    });

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        data: { name: "Test" },
      });
       await new Promise((r) => setTimeout(r, 10));
    });

    const cache = queryClient.getQueryData([endpoint]);

    expect(cache).toEqual({
      products: [{ id: 1, name: "Safe" }],
    });
  });

  // ==========================
  // ERROR LEAK PREVENTION
  // ==========================

  it("does not leak sensitive error details", async () => {
    const endpoint = "products";

    (dataService.createItem as any).mockRejectedValue(
      new Error("SQLSTATE[23000]: Integrity constraint violation")
    );

    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );   

    await act(async () => {
        await act(async () => {
        await new Promise<void>((resolve) => {
          result.current.mutate(
            { data: { name: "Test" } },
            { onError: () => resolve() }
          );
        });
      });
});

expect(result.current.error?.message).toBe('An error occurred') // sanitized
  });

  // ==========================
  // IMMUTABILITY (STATE SAFETY)
  // ==========================

  it("does not mutate original cache object reference", async () => {
    const endpoint = "products";
    (dataService.createItem as any).mockResolvedValue({});

    const { queryClient, wrapper } = createWrapper();

    const original = {
      products: [{ id: 1, name: "Old" }],
    };

    queryClient.setQueryData([endpoint], original);

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        data: { name: "New" },
      });
    });

    const updated = queryClient.getQueryData([endpoint]);

    expect(updated).not.toBe(original);
  });
});