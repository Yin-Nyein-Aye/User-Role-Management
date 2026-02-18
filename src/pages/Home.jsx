import heroImg from '../assets/homepage3.jpg'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/data/dataThunk";
import Pagination from '../components/Pagination';
import Card from '../components/Card';

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error, page, limit } = useSelector((state) => state.data);
  
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchData({page,limit,endpoint: "posts",
    signal: controller.signal
  }));

  return () => { controller.abort(); };
  }, [dispatch,page,limit]);
   
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="relative w-screen h-[500px]">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className='absolute inset-0  flex justify-center items-center'>
          <h1 className='text-white font-bold text-base sm:text-xl md:text-3xl lg:text-5xl'>FRESHY BAKED FOR YOU!</h1>
        </div>
      </div>
      {!!items && 
      <div className="max-w-screen overflow-hidden rounded shadow-lg">
        <h2 className='text-6xl py-6 font-bold text-center'>Posts</h2>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-3'>
          {items.map((post) => (
            <Card key={post.id} post={post}/>
          ))}
        </ul>
        <Pagination />
      </div>}
    </>   
  )
}