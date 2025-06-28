import { getflight } from "@/api";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Flight {
  id: string;
  flightName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: any) => state.user.user);
  const [flight, setflight] = useState<Flight[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchflight = async () => {
      try {
        const data = await getflight();
        const filterdata = data.filter((flights: any) => flights.id === id);
        const flightdata = filterdata[0];
        // console.log(flightdata);
        setflight(flightdata);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };
    fetchflight();
  }, [id, user]);
  if (loading) {
    return <Loader />;
  }
  return <div>index</div>;
};

export default index;
