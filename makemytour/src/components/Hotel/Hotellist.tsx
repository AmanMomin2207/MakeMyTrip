import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getflight, gethotel } from "@/api";
import Loader from "../Loader";

const HotelList = ({ onSelect }: any) => {
  const [hotels, sethotels] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchhotel = async () => {
      try {
        const data = await gethotel();
        sethotels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };
    fetchhotel();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 ">Hotel List</h3>
      <Table>
        <TableHeader className="bg-gray-500">
          <TableRow>
            <TableHead>Hotel Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price Per Night</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.length > 0 ? (
            hotels?.map((hotel: any) => (
              <TableRow key={hotel._id}>
                <TableCell>{hotel.hotelName}</TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>{hotel.pricePerNight}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(hotel)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HotelList;
