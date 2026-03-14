import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import PostModalForm from "../components/PostModalForm";
import InfinitePosts from "../components/InfinitePosts";
import { useInfinitePaginatedQuery } from "../hooks/useInfinitePaginatedQuery";
import { useCreateData } from "../hooks/useCreateData";
import { useDeleteData } from "../hooks/useDeleteData";
import { Post } from "../types/dataParams.ts";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state) => state.data);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePaginatedQuery<Post>({ endpoint: "posts", limit: 8 });

  const { mutate: deletePost } = useDeleteData("posts");
  const { mutate: savePost } = useCreateData<Post>("posts");

  const handleAddPost = ({ title, body }) =>
    savePost(
      { data: { title, body, userId: 1 } },
      { onSuccess: (data) => console.log("Created post:", data) },
    );

  const handleDeletePost = (id) =>
    deletePost(id, {
      onSuccess: () => console.log("Deleted post Successfully"),
    });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <HeroSection />

      <div className="max-w-screen overflow-hidden rounded shadow-lg">
        <h2 className="text-6xl py-3 font-bold text-center">Posts</h2>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-900 text-white p-2 rounded-2xl m-3"
        >
          Add Post
        </button>

        {isOpen && (
          <PostModalForm
            onClose={() => setIsOpen(false)}
            onSubmit={handleAddPost}
          />
        )}

        <InfinitePosts
          data={{ ...data, handleDeletePost, handleUpdatePost: handleAddPost }}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
