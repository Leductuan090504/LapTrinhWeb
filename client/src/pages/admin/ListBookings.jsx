import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY

    const {axios, getToken, user} = useAppContext()

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBookings = async () => {
        try {
          const { data } = await axios.get("/api/admin/all-bookings", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                setBookings(data.bookings || [])
            } else {
                setBookings([])
                toast.error(data.message || 'Failed to load bookings')
            }
        } catch (error) {
          console.error(error);
          setBookings([])
          toast.error('Failed to load bookings')
        }
        setIsLoading(false)
    };

     useEffect(() => {
      if (user) {
        getAllBookings();
      }    
    }, [user]);


  return !isLoading ? (
    <>
      <Title text1="Danh Sách Đặt Vé" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse  rounded-md overflow-hidden text-nowrap">
            <thead>
                <tr className="bg-primary/20 text-left text-white">
                    <th className="p-2 font-medium pl-5">Tên Khách Hàng</th>
                    <th className="p-2 font-medium">Tên Phim</th>
                    <th className="p-2 font-medium">Thời Gian Chiếu</th>
                    <th className="p-2 font-medium">Ghế</th>
                    <th className="p-2 font-medium">Số Tiền</th>
                </tr>
            </thead>
            <tbody className="text-sm font-light">
                {bookings.map((item, index) => (
                    <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
                        <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                        <td className="p-2">{item.show.movie.title}</td>
                        <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                        <td className="p-2">{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")}</td>
                        <td className="p-2">{currency} {item.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </>
  ) : <Loading />
}

export default ListBookings
