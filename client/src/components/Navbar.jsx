import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

 const [isOpen, setIsOpen] = useState(false)
 const {user} = useUser()
 const clerk = useClerk()
 const {openSignIn} = clerk
 const [menuOpen, setMenuOpen] = useState(false)

 const navigate = useNavigate()

 const {favoriteMovies} = useAppContext()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className='w-36 h-auto'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>

        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Trang Chủ</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/movies'>Phim Đang Chiếu</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Rạp Chiếu Phim</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/'>Nhà Phát Hành</Link>
       {favoriteMovies.length > 0 && <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/favorite'>Yêu Thích</Link>}
      </div>

    <div className='flex items-center gap-8'>
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
        {
            !user ? (
                <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Đăng Nhập</button>
            ) : (
                <div className='relative'>
                  <button onClick={() => setMenuOpen(v => !v)} className='w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
                    {user?.image ? <img src={user.image} alt="avatar" className='w-full h-full object-cover'/> : <span className='text-sm font-medium'>{(user?.firstName || user?.name || 'U')[0]}</span>}
                  </button>
                  {menuOpen && (
                    <div className='absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-50'>
                      <div className='px-4 py-3 border-b'>
                        <div className='font-semibold text-sm'>{user?.fullName || user?.full_name || user?.firstName || user?.name}</div>
                        <div className='text-xs text-gray-500'>{user?.emailAddresses?.[0]?.emailAddress || user?.email}</div>
                      </div>
                      <button onClick={() => { setMenuOpen(false); clerk.openUserProfile && clerk.openUserProfile(); }} className='w-full text-left px-4 py-2 hover:bg-gray-100'>Quản lý tài khoản</button>
                      <button onClick={() => { setMenuOpen(false); navigate('/my-bookings'); }} className='w-full text-left px-4 py-2 hover:bg-gray-100'>Đơn đặt vé của tôi</button>
                      <button onClick={() => { setMenuOpen(false); clerk.signOut && clerk.signOut(); }} className='w-full text-left px-4 py-2 hover:bg-gray-100'>Đăng xuất</button>
                    </div>
                  )}
                </div>
            )
        }
        
    </div>

    <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>

    </div>
  )
}

export default Navbar
