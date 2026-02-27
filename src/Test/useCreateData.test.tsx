import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useCreateData } from "../hooks/useCreateData";
import * as dataService from "../features/data/dataService";

// ✅ Mock API functions
vi.mock("../features/data/dataService", () => ({
  createItem: vi.fn(),
  updateItem: vi.fn(),
}));

// ✅ Helper to create fresh QueryClient
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

describe("useCreateData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================
  // CREATE
  // ==========================
  it("calls createItem when no id is provided", async () => {
    const endpoint = "products";

    (dataService.createItem as any).mockResolvedValue({});

    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        data: { name: "New Product" },
      });
    });

    expect(dataService.createItem).toHaveBeenCalledWith(
      endpoint,
      { data: { name: "New Product" } }
    );
  });

  it("optimistically adds new item to cache", async () => {
    const endpoint = "products";

    (dataService.createItem as any).mockResolvedValue({});

    const { queryClient, wrapper } = createWrapper();

    queryClient.setQueryData([endpoint], {
      products: [{ id: 1, name: "Old" }],
    });

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        data: { name: "New Product" },
      });
    });

    const updated = queryClient.getQueryData([endpoint]) as any;

    expect(updated.products.length).toBe(2);
    expect(updated.products[0].name).toBe("New Product");
  });

  // ==========================
  // UPDATE
  // ==========================
  it("calls updateItem when id is provided", async () => {
    const endpoint = "products";

    (dataService.updateItem as any).mockResolvedValue({});

    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        id: 1,
        data: { name: "Updated" },
      });
    });

    expect(dataService.updateItem).toHaveBeenCalledWith(
      endpoint,
      1,
      { name: "Updated" }
    );
  });

  it("optimistically updates item in cache", async () => {
    const endpoint = "products";

    (dataService.updateItem as any).mockResolvedValue({});

    const { queryClient, wrapper } = createWrapper();

    queryClient.setQueryData([endpoint], {
      products: [
        { id: 1, name: "Old" },
        { id: 2, name: "Second" },
      ],
    });

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        id: 1,
        data: { name: "Updated" },
      });
    });

    const updated = queryClient.getQueryData([endpoint]) as any;

    expect(updated.products[0].name).toBe("Updated");
  });

  // ==========================
  // ROLLBACK
  // ==========================
  it("restores previous data on error", async () => {
    const endpoint = "products";

    (dataService.createItem as any).mockRejectedValue(
      new Error("Failed")
    );

    const { queryClient, wrapper } = createWrapper();

    queryClient.setQueryData([endpoint], {
      products: [{ id: 1, name: "Old" }],
    });

    const { result } = renderHook(
      () => useCreateData(endpoint),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        data: { name: "New Product" },
      });
    });

    const restored = queryClient.getQueryData([endpoint]);

    expect(restored).toEqual({
      products: [{ id: 1, name: "Old" }],
    });
  });
});