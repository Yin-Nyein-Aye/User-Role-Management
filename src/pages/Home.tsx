import heroImg from '../assets/homepage3.jpg'
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/data/dataThunk";
import Pagination from '../components/Pagination';
import Card from '../components/Card';
import { useQuery } from '@tanstack/react-query';
import { getDataApi } from '../features/data/dataService';
import { setPage } from '../features/data/dataSlice';
import { FixedSizeGrid as Grid } from "react-window";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";
import { useInfinitePaginatedQuery } from '../hooks/useInfinitePaginatedQuery';

export default function Home() {
  const dispatch = useDispatch();
  // const { items, loading, error, page, limit } = useSelector((state) => state.data);
  // useEffect(() => {
  //   const controller = new AbortController();
  //   dispatch(fetchData({page,limit,endpoint: "posts",
  //   signal: controller.signal
  // }));

  //   return () => { controller.abort(); };
  // }, [dispatch,page,limit]);

  const { page, limit } = useSelector((state) => state.data);
  // const endpoint = "posts";
  const screenWidth = window.innerWidth;
  
  let columns = 1;
    if (screenWidth >= 1024) columns = 4;
    else if (screenWidth >= 768) columns = 2;

  const columnWidth = Math.floor(screenWidth / columns);

  // use custom hook
  // const { data, isLoading, isError, error } =
  //   usePaginatedQuery({
  //     endpoint: "posts",
  //     page,
  //     limit,
  //     filters: {}, 
  //     sortBy: "title",
  //     order: "desc"
  //   });

      const { data, isLoading,isError, error,fetchNextPage, hasNextPage,isFetchingNextPage } = 
      useInfinitePaginatedQuery<Post>({
        endpoint: "posts",
        limit: 8,
    });
 console.log("data")
 console.log(fetchNextPage)
 console.log("data")
 console.log(hasNextPage)
 console.log("data")
 console.log(isFetchingNextPage)

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


  // const { data, isLoading, isError, error } = useQuery({ 
  //   queryKey: [page, limit, endpoint], 
  //   queryFn: () => getDataApi({ page, limit, endpoint }), 
  //   keepPreviousData: true, 
  //   staleTime: 1000 * 60 * 5,
  // });
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
      {/* {!!posts &&
      <div className="max-w-screen overflow-hidden rounded shadow-lg">
        <h2 className='text-6xl py-6 font-bold text-center'>Posts</h2>

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
                <Card key={posts[itemIndex].id} post={posts[itemIndex]} />
              </div>
            );
          }}
        </Grid> */}

        {/* using without react-window */}
        {/* <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-3'>
          {data.posts.map((post) => (
            <Card key={post.id} post={post}/>
          ))}
        </ul> */}

        {/* <Pagination page={page} total={data.total} limit={limit} onPageChange={(newPage) => dispatch(setPage(newPage))}/>
      </div>}
    </>  */}
    
    
      {!!posts.length && (
        <div className="max-w-screen overflow-hidden rounded shadow-lg">
          <h2 className="text-6xl py-6 font-bold text-center">Posts</h2>

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
                  <Card key={posts[itemIndex].id} post={posts[itemIndex]} />
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