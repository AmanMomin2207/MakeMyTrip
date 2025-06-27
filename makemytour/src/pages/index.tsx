import SearchSelect from "@/components/SearchSelect";
import SignupDialog from "@/components/SignupDialog";
import {
  Bus,
  Calendar,
  Car,
  CreditCard,
  HomeIcon,
  Hotel,
  MapPin,
  Plane,
  Shield,
  Train,
  Umbrella,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function Home() {
  const [bookingtype, setbookingtype] = useState("flights");
  const [from, setfrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setdate] = useState("");
  const [travelers, settravelers] = useState(1);
  const [searchresult, setsearchresult] = useState<any[]>([]);

  const flightData = [
    { id: 1, from: "Delhi", to: "Mumbai", date: "2025-01-15", price: 5000 },
    { id: 2, from: "Mumbai", to: "Bangalure", date: "2025-01-16", price: 4500 },
    { id: 3, from: "Bangalure", to: "Delhi", date: "2025-01-17", price: 5500 },
    { id: 4, from: "Delhi", to: "Kolkata", date: "2025-01-18", price: 6000 },
  ];

  const hotelData = [
    { id: 1, name: "Luxury Palace", city: "Mumbai", price: 15000 },
    { id: 2, name: "Comfort Inn", city: "Delhi", price: 8000 },
    { id: 3, name: "Seaside Resort", city: "Goa", price: 12000 },
    { id: 4, name: "Mountain View Hotel", city: "Shimla", price: 10000 },
  ];

  const offers = [
    {
      title: "Domestic Flights",
      description: "Get up to 20% off on domestic flights",
      imageUrl:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800",
    },
    {
      title: "International Hotels",
      description: "Book luxury hotels worldwide",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
    },
    {
      title: "Holiday Packages",
      description: "Exclusive deals on holiday packages",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800",
    },
  ];

  const collections = [
    {
      title: "Stays in & Around Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800",
      tag: "TOP 8",
    },
    {
      title: "Stays in & Around Mumbai",
      imageUrl:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800",
      tag: "TOP 8",
    },
    {
      title: "Stays in & Around Bangalore",
      imageUrl:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800",
      tag: "TOP 9",
    },
    {
      title: "Beach Destinations",
      imageUrl:
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=800",
      tag: "TOP 11",
    },
  ];

  const wonders = [
    {
      title: "Shimla's Best Kept Secret",
      imageUrl:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800",
    },
    {
      title: "Tamil Nadu's Charming Hill Town",
      imageUrl:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800",
    },
    {
      title: "Quaint Little Hill Station in Gujarat",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800",
    },
    {
      title: "A pleasant summer retreat",
      imageUrl:
        "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800",
    },
  ];
  const cityoption = useMemo(() => {
    const cities = new Set<string>();
    flightData.forEach((flight) => {
      cities.add(flight.from);
      cities.add(flight.to);
    });
    hotelData.forEach((hotel) => {
      cities.add(hotel.city);
    });
    return Array.from(cities).map((city) => ({ value: city, label: city }));
  }, []);
  const handlesearch = () => {
    if (bookingtype === "flights") {
      const results = flightData.filter(
        (FLIGHT) =>
          FLIGHT.from.toLowerCase() === from.toLowerCase() &&
          FLIGHT.to.toLowerCase() === to.toLowerCase()
      );
      setsearchresult(results);
    } else if (bookingtype === "hotels") {
      const results = hotelData.filter(
        (HOTEL) => HOTEL.city.toLowerCase() === to.toLowerCase()
      );
      setsearchresult(results);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80")',
      }}
    >
      <main className="container mx-auto px-4 py-6">
        <nav className="bg-white rounded-xl shadow-lg mx-auto max-w-5xl mb-6 p-4 overflow-x-auto ">
          <div className="flex justify-between items-center min-w-max space-x-8">
            <Navitem
              icon={<Plane />}
              text="Flights"
              active={bookingtype === "flights"}
              onClick={() => setbookingtype("flights")}
            />
            <Navitem
              icon={<Hotel />}
              text="Hotels"
              active={bookingtype === "hotels"}
              onClick={() => setbookingtype("hotels")}
            />
            <Navitem icon={<HomeIcon />} text="Homestay" />
            <Navitem icon={<Umbrella />} text="Holiday" />
            <Navitem icon={<Train />} text="Trains" />
            <Navitem icon={<Bus />} text="Buses" />
            <Navitem icon={<Car />} text="Cabs" />
            <Navitem icon={<CreditCard />} text="Forex" />
            <Navitem icon={<Shield />} text="Insurance" />
          </div>
        </nav>

        <div>
          <div>
            {bookingtype === "flights" && (
              <div>
                {" "}
                <SearchSelect
                  option={cityoption}
                  placeholder="From"
                  value={from}
                  onChange={setfrom}
                  icon={<MapPin />}
                  subtitle="Enter City or Airport"
                />
              </div>
            )}
            <div>
              <SearchSelect
                option={cityoption}
                placeholder={bookingtype === "flights" ? "to" : "city"}
                value={to}
                onChange={setTo}
                icon={<MapPin />}
                subtitle={
                  bookingtype === "flights"
                    ? "Enter City or Airport"
                    : "Enter City"
                }
              />
            </div>
            <div>
              <SearchSelect
                placeholder={bookingtype === "flights" ? "to" : "city"}
                value={date}
                onChange={setTo}
                icon={<Calendar />}
                subtitle="Select a date"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Navitem({ icon, text, active = false, onClick }: any) {
  return (
    <button
      className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
        active ? "text-blue-500" : "text-gray-600 hover:text-blue-500"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm mt-1 whitespace-nowrap">{text}</span>
    </button>
  );
}
