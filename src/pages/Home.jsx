import heroImg from '../assets/homepage3.jpg'
export default function Home() {
  return (
    <div className="relative w-screen h-[500px]">
      <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className='absolute inset-0  flex justify-center items-center'>
        <h1 className='text-white font-bold text-base sm:text-xl md:text-3xl lg:text-5xl'>FRESHY BAKED FOR YOU!</h1>
      </div>
    </div>
  )
}
