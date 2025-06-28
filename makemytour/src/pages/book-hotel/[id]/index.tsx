import { gethotel } from "@/api";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Hotel {
  hotelName: string;
  location: string;
  pricePerNight: number;
  availableRooms: number;
  amenities: string;
}

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: any) => state.user.user);
  const [hotels, sethotels] = useState<Hotel[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchhotel = async () => { 
      try {
        const data = await gethotel();
        const filterdata = data.filter((hotels: any) => hotels.id === id);
        const hoteldata = filterdata[0];
        sethotels(hoteldata);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };
    fetchhotel();
  }, [id, user]);
  if (loading) {
    return <Loader />;
  }
  return <div>index</div>;
};

export default index;
