import search from '../assets/search-normal.png';
import notification from '../assets/notification.png';
import profile from '../assets/biggerProfile.png';
import arrowDown from '../assets/arrow-down.png'
import  { useState } from 'react';

const Navbar = () => {

const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className='flex flex-row justify-between items-center py-1.25 px-2 md:px-4 md:py-3.5 border-b border-b-neutral-300 bg-white'>
        <div className="relative w-[60%] md:w-[40%] ">
          <img className="absolute left-3 top-57/100 md:top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4"  src={search} alt='search icon'/>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-6.5 md:pl-10 pr-4 py-0.5 md:py-2 bg-white  border border-neutral-300 rounded-lg text-[10px] md:text-xs  focus:ring-2 focus:ring-neutral-200 outline-none"/>
        </div>
        <div className='flex flex-row items-center hover:cursor-pointer'>
          <img src={notification} alt='notification bell' className='h-2.5 w-2.5 m-0.5 md:m-2 md:h-5 md:w-5' />
          <img src={profile} alt="profile image" className='h-3.5 w-3.5 mr-1 md:h-7 md:w-7 md:mr-2'/>
          <div className='flex flex-row items-center'>
            <p className='text-[10px] md:text-[13px] font-semibold'>Ade.T</p>
            <img src={arrowDown} alt="arrow" className='h-2.8 w-2.5 mt-0.5' />
          </div>
        </div>
    </div>
  )
}

export default Navbar