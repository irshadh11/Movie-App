import { useLocation } from "react-router-dom";
import CircularUnderLoad from "../components/CircularUnderLoad";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const fromBooking = location.state?.fromBooking;

  useEffect(() => {
    if (fromBooking) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [fromBooking]);

  if (loading) return <CircularUnderLoad />;

  if (!fromBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold text-orange-500">
          No Bookings yet
        </h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-orange-500">
          🎉 Booking Successful!
        </h1>

        <p className="text-lg text-gray-300">
          You have successfully booked your ticket.
        </p>

        <p className="text-sm text-gray-400">
          Enjoy your movie 🍿
        </p>
      </div>
    </div>
  );
};
export default MyBookings;