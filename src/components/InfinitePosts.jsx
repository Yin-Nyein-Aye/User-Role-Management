import PostsGrid from "./PostsGrid";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function InfinitePosts({
  data,
  isFetchingNextPage,
  hasNextPage,
}) {
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const loadMoreRef = useInfiniteScroll(data?.fetchNextPage, hasNextPage);

  if (!posts.length)
    return <p className="text-center py-4 text-gray-500">No posts found.</p>;

  return (
    <>
      <PostsGrid
        posts={posts}
        handleDeletePost={data.handleDeletePost}
        handleUpdatePost={data.handleUpdatePost}
      />
      <div ref={loadMoreRef} className="h-10" />
      {isFetchingNextPage && (
        <p className="text-center py-4 text-gray-500">Loading more...</p>
      )}
    </>
  );
}
