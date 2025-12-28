import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>

      <img src={assets.marvelLogo} alt="" className="max-h-11 lg:h-11 mt-20"/>

      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians <br /> of the Galaxy</h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>Hành động | Phiêu lưu | Khoa học viễn tưởng</span>
        <div className='flex items-center gap-1'>
            <CalendarIcon className='w-4.5 h-4.5'/> 2025
        </div>
        <div className='flex items-center gap-1'>
            <ClockIcon className='w-4.5 h-4.5'/> 2h 8m
        </div>
      </div>
      <p className='max-w-md text-gray-300'>Trên một trái đất tan hoang sau chiến tranh hạt nhân, những thành phố khổng lồ được lắp đặt hệ thống bánh xe cho phép chúng di chuyển tự do. Để sống sót, mỗi thành phố buộc phải tấn công các thành phố khác, cướp phá tài nguyên và xóa sổ đối thủ. Tại London - một trong những thành phố di động còn sót lại - hai nhân vật bất ngờ gặp nhau và phát hiện ra một âm mưu nguy hiểm. Họ cùng hành động để phá vỡ kế hoạch này và cứu lấy tương lai của loài người.</p>
      <button onClick={()=> navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
         Xem Phim
         <ArrowRight className="w-5 h-5"/>
      </button>
    </div>
  )
}

export default HeroSection
