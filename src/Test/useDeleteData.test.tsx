import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import { useDeleteData } from "../hooks/useDeleteData";
import * as dataService from "../features/data/dataService";

vi.spyOn(dataService, "deleteItem").mockImplementation(async (_endpoint, _id) => {
    return Promise.resolve({ success: true });
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("useDeleteData", () => {
    it("calls deleteItem with correct params", async () => {
        const { result } = renderHook(() => useDeleteData("posts"), { wrapper });

        await act(async () => {
            await result.current.mutateAsync(1);
        });

        expect(dataService.deleteItem).toHaveBeenCalledWith("posts", 1);
    });

    it("optimistically removes item from cache", async () => {
        const queryClient = new QueryClient();
        queryClient.setQueryData(["posts"], {
            posts: [{ id: 1 }, { id: 2 }],
        });

        const { result } = renderHook(() => useDeleteData("posts"), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            ),
        });

        await act(async () => {
            result.current.mutate(1);
        });

        const updated = queryClient.getQueryData(["posts"]);
        expect(updated).toEqual({ posts: [{ id: 2 }] });
    });

    it("restores previous data on error", async () => {
        (dataService.deleteItem as any).mockRejectedValueOnce(new Error("fail"));

        const queryClient = new QueryClient();
        queryClient.setQueryData(["posts"], {
            posts: [{ id: 1 }, { id: 2 }],
        });

        const { result } = renderHook(() => useDeleteData("posts"), {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            ),
        });

        await act(async () => {
            try {
                await result.current.mutateAsync(1);
            } catch { }
        });

        const restored = queryClient.getQueryData(["posts"]);
        expect(restored).toEqual({ posts: [{ id: 1 }, { id: 2 }] });
    });
});
