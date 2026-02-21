import heroImg from '../assets/homepage3.jpg'
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '../components/Card';
import { useInfinitePaginatedQuery } from '../hooks/useInfinitePaginatedQuery';
import { FixedSizeGrid as Grid } from "react-window";
import {useCreateData} from '../hooks/useCreateData'
import {useDeleteData} from '../hooks/useDeleteData'
import { Post } from "../types/dataParams.ts"

export default function Home() {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state) => state.data);
  const screenWidth = window.innerWidth;
  
  let columns = 1;
    if (screenWidth >= 1024) columns = 4;
    else if (screenWidth >= 768) columns = 2;

  const columnWidth = Math.floor(screenWidth / columns);

  const { data, isLoading,isError, error,fetchNextPage, hasNextPage,isFetchingNextPage } = 
    useInfinitePaginatedQuery<Post>({
      endpoint: "posts",
      limit: 8,
    });

  const posts =
  data?.pages.flatMap((page) => page.posts) ?? [];

  const loadMoreRef = useRef();
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

const { mutate: deletePost } = useDeleteData("posts");
const { mutate: savePost } = useCreateData<Post>("posts");

const handleDeletePost = (id : number) => {
  console.log(id)
  deletePost(
    id, 
    {
      onSuccess: () => {
        console.log("Deleted post Successfully");
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
      },
    }
  );
};

const handleAddPost = () => {
  savePost(
    { title: "New Post", body: "Hello world", userId: 1 },
    {
      onSuccess: (data) => console.log("Created post:", data),
      onError: (error) => console.error("Error creating post:", error),
    }
  );
};

const handleUpdatePost = (id) => {
  savePost(
    { id, title: "Updated Title", body: "Updated body text" },
    {
      onSuccess: (data) => console.log("Updated post:", data),
      onError: (error) => console.error("Error updating post:", error),
    }
  );
};

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <>
      <div className="relative w-screen h-[500px]">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className='absolute inset-0  flex justify-center items-center'>
          <h1 className='text-white font-bold text-base sm:text-xl md:text-3xl lg:text-5xl'>FRESHY BAKED FOR YOU!</h1>
        </div>
      </div>  
      {!!posts.length && (
        <div className="max-w-screen overflow-hidden rounded shadow-lg">
          <h2 className="text-6xl py-3 font-bold text-center">Posts</h2>
          <button onClick={handleAddPost} className='bg-amber-900 text-white p-2 rounded-2xl m-3'>Add Post</button>

          <Grid
            columnCount={columns}
            columnWidth={columnWidth}
            width={columnWidth * columns}
            rowCount={Math.ceil(posts.length / columns)}
            rowHeight={700}
            height={800}
          >
            {({ columnIndex, rowIndex, style }) => {
              const itemIndex = rowIndex * columns + columnIndex;
              if (itemIndex >= posts.length) return null;

              return (
                <div style={style} className="p-3">
                  <Card key={posts[itemIndex].id} post={posts[itemIndex]} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} />
                </div>
              );
            }}
          </Grid>

          {/* Invisible div to trigger infinite scroll */}
          <div ref={loadMoreRef} className="h-10" />

          {isFetchingNextPage && (
            <p className="text-center py-4 text-gray-500">Loading more...</p>
          )}
        </div>
      )}
    </>
  )
}