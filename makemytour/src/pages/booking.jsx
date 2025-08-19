"use client";
import { useState } from "react";

export default function Bookings() {
  const [result, setResult] = useState(null);


  async function handleCancel() {
    const data = await cancelBooking("user123", "booking789", "Change of plans");
    setResult(data);
  }

  return (
    <div className="p-4">
      <button onClick={handleCancel} className="bg-red-500 text-white p-2 rounded ml-2">
        Cancel Booking
      </button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
