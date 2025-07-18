import {
  addflight,
  addhotel,
  editflight,
  edithotel,
  getuserbyemail,
} from "@/api";
import FlightList from "@/components/Flights/Flightlist";
import HotelList from "@/components/Hotel/Hotellist";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

const Flights = [
  {
    _id: "1",
    flightName: "AirOne 101",
    from: "New York",
    to: "London",
    departureTime: "2023-07-01T08:00",
    arrivalTime: "2023-07-01T20:00",
    price: 500,
    availableSeats: 150,
  },
  {
    _id: "2",
    flightName: "SkyHigh 202",
    from: "Paris",
    to: "Tokyo",
    departureTime: "2023-07-02T10:00",
    arrivalTime: "2023-07-03T06:00",
    price: 800,
    availableSeats: 200,
  },
  {
    _id: "3",
    flightName: "EagleWings 303",
    from: "Los Angeles",
    to: "Sydney",
    departureTime: "2023-07-03T22:00",
    arrivalTime: "2023-07-05T06:00",
    price: 1200,
    availableSeats: 180,
  },
];

const Hotels = [
  {
    _id: "1",
    hotelName: "Luxury Palace",
    location: "Paris, France",
    pricePerNight: 300,
    availableRooms: 50,
    amenities: "Wi-Fi, Pool, Spa, Restaurant",
  },
  {
    _id: "2",
    hotelName: "Seaside Resort",
    location: "Bali, Indonesia",
    pricePerNight: 200,
    availableRooms: 100,
    amenities: "Beach Access, Wi-Fi, Restaurant, Water Sports",
  },
  {
    _id: "3",
    hotelName: "Mountain Lodge",
    location: "Aspen, Colorado",
    pricePerNight: 250,
    availableRooms: 30,
    amenities: "Ski-in/Ski-out, Fireplace, Hot Tub, Restaurant",
  },
];

const index = () => {
  const [activeTab, setactiveTab] = useState("flights");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  return (
    <div className="container mx-auto p-4 bg-white max-w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setactiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-500">
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="hotels">Hotel</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="flights">
          <Card>
            <CardHeader>
              <CardTitle>Manage flights</CardTitle>
              <CardDescription>
                Add , edit or remove flights from the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid  grid-cols-2 gap-4">
                <FlightList onSelect={setSelectedFlight} />
                <Addeditflight flight={selectedFlight} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hotels">
          <Card>
            <CardHeader>
              <CardTitle>Manage hotels</CardTitle>
              <CardDescription>
                Add , edit or remove hotels from the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid  grid-cols-2 gap-4">
                <HotelList onSelect={setSelectedHotel} />
                <Addedithotel hotel={selectedHotel} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Search users by email</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default index;
interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber: string;
}
function UserSearch() {
  const [email, setemail] = useState("");
  const [user, setuser] = useState<User | null>(null);

  const handlesearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await getuserbyemail(email);
    const sampleuser = data;
    setuser(sampleuser);
  };
  return (
    <div className="space-y-4">
      <form onSubmit={handlesearch} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="search user by email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      {user && (
        <div className="border p-4 rounded-md">
          <h3 className="font-bold mb-2">User Details</h3>
          <p>
            <strong>Name:</strong>
            {user.firstname} {user.lastname}
          </p>
          <p>
            <strong>Email:</strong>
            {user.email}
          </p>
          <p>
            <strong>Role:</strong>
            {user.role}
          </p>
          <p>
            <strong>Phone:</strong>
            {user.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );
}

interface Hotel {
  id?: string;
  hotelName: string;
  location: string;
  pricePerNight: number;
  availableRooms: number;
  amenities: string;
}

function Addedithotel({ hotel }: { hotel: Hotel | null }) {
  const [formdata, setformdata] = useState({
    hotelName: "",
    location: "",
    pricePerNight: 0,
    availableRooms: 0,
    amenities: "",
  });
  useEffect(() => {
    if (hotel) {
      setformdata(hotel);
    } else {
      setformdata({
        hotelName: "",
        location: "",
        pricePerNight: 0,
        availableRooms: 0,
        amenities: "",
      });
    }
  }, [hotel]);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hotel) {
      await edithotel(
        hotel.id,
        formdata.hotelName,
        formdata.location,
        formdata.pricePerNight,
        formdata.availableRooms,
        formdata.amenities
      );
      return;
    }

    await addhotel(
      formdata.hotelName,
      formdata.location,
      formdata.pricePerNight,
      formdata.availableRooms,
      formdata.amenities
    );

    if (!hotel) {
      setformdata({
        hotelName: "",
        location: "",
        pricePerNight: 0,
        availableRooms: 0,
        amenities: "",
      });
    }
  };

  return (
    <form onSubmit={handlesubmit} className="space-y-4 ">
      <h3 className="text-lg font-semibold mb-2">
        {hotel ? "Edit Hotel" : "Add new Hotel"}
      </h3>
      <div>
        <Label htmlFor="hotelName">Hotel name</Label>
        <Input
          id="hotelName"
          name="hotelName"
          value={formdata.hotelName}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="from">Location</Label>
        <Input
          id="location"
          name="location"
          value={formdata.location}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="to">PricePerNight</Label>
        <Input
          id="pricePerNight"
          name="pricePerNight"
          type="number"
          value={formdata.pricePerNight}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="availableRooms">Available Rooms </Label>
        <Input
          id="availableRooms"
          name="availableRooms"
          type="number"
          value={formdata.availableRooms}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="amenities">Amenities</Label>
        <Input
          id="amenities"
          name="amenities"
          value={formdata.amenities}
          onChange={handlechange}
          required
        />
      </div>
      <Button type="submit">{hotel ? "Update Hotel" : "Add Hotel"}</Button>
    </form>
  );
}

interface Flight {
  id?: string;
  flightName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

function Addeditflight({ flight }: { flight: Flight | null }) {
  const [formdata, setformdata] = useState({
    flightName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    if (flight) {
      setformdata(flight);
    } else {
      setformdata({
        flightName: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: 0,
        availableSeats: 0,
      });
    }
  }, [flight]);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting flight data:", formdata);

    if (flight) {
      await editflight(
        flight?.id,
        formdata.flightName,
        formdata.from,
        formdata.to,
        formdata.departureTime,
        formdata.arrivalTime,
        formdata.price,
        formdata.availableSeats
      );
      return;
    }

    await addflight(
      formdata.flightName,
      formdata.from,
      formdata.to,
      formdata.departureTime,
      formdata.arrivalTime,
      formdata.price,
      formdata.availableSeats
    );

    if (!flight) {
      setformdata({
        flightName: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: 0,
        availableSeats: 0,
      });
    }
  };

  return (
    <form onSubmit={handlesubmit} className="space-y-4 ">
      <h3 className="text-lg font-semibold mb-2">
        {flight ? "Edit Flight" : "Add new flight"}
      </h3>
      <div>
        <Label htmlFor="flightName">Flight name</Label>
        <Input
          id="flightName"
          name="flightName"
          value={formdata.flightName}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="from">From</Label>
        <Input
          id="from"
          name="from"
          value={formdata.from}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="to">To</Label>
        <Input
          id="to"
          name="to"
          value={formdata.to}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="departuretime">Departure Time</Label>
        <Input
          id="departureTime"
          name="departureTime"
          type="datetime-local"
          value={formdata.departureTime}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="arrivalTime">Arrival Time</Label>
        <Input
          id="arrivalTime"
          name="arrivalTime"
          type="datetime-local"
          value={formdata.arrivalTime}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formdata.price}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <Label htmlFor="availableSeats">Available Seats</Label>
        <Input
          id="availableSeats"
          name="availableSeats"
          type="number"
          value={formdata.availableSeats}
          onChange={handlechange}
          required
        />
      </div>
      <Button type="submit">{flight ? "Update Flight" : "Add Flight"}</Button>
    </form>
  );
}
