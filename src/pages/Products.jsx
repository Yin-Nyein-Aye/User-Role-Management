import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/data/dataThunk";
import breadImg from '../assets/bread_home_page.jpg'
import Pagination from '../components/Pagination';
import { useQuery } from "@tanstack/react-query";
import { getDataApi } from "../features/data/dataService";
import { setPage } from "../features/data/dataSlice";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";

export default function Products() {
    const dispatch = useDispatch();
    const {page,limit } = useSelector((state) => state.data);

    // const endpoint = "products";

    // const { data, isLoading, isError, error } = useQuery({ 
    //   queryKey: [page, limit, endpoint], 
    //   queryFn: () => getDataApi({ page, limit, endpoint }), 
    //   keepPreviousData: true, 
    // });

    const { data, isLoading, isError, error } =
      usePaginatedQuery({
        endpoint: "products",
        page,
        limit,
        filters: { category: "bread" }, // example
        sortBy: "title",
        order: "asc"
      });


    useEffect(() => {
        dispatch(fetchData({page,limit,endpoint: "products"}));
    }, [dispatch,page,limit]);
    
    if (isLoading) return <p>Loading posts...</p>;
    if (isError) return <p style={{ color: "red" }}>{error.message}</p>;

    return (
      <>
        {!!data.products && 
        <div className="max-w-screen overflow-hidden rounded shadow-lg">
          <h2 className='text-6xl py-6 font-bold text-center'>Products</h2>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-3'>
            {data.products.map((post) => (
              <li key={post.id}>
                <img className="w-full" src={breadImg} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{post.title}</div>
                  <p className="text-black-700 text-base">
                    {post.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Pagination page={page} total={data.total} limit={limit} onPageChange={(newPage) => dispatch(setPage(newPage))} />
        </div>}
      </>  
    )
}
