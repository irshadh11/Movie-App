import { useNavigate } from "react-router-dom"
import  screenImage  from "../assets/screenImage.svg";
import { useState } from "react";
import {seatData} from "../mock/seat";

type Seat = {
  id: string;
  row: string;
  number: number;
  type: string;
  price: number;
  booked: boolean;
  selected: boolean;
};

const SeatLayout = () => {
  const [seats, setSeats] = useState<Seat[]>(
    seatData.seats.map((seat) =>({
      ...seat,
      selected:false,

    }))
  );

  const handleSeatSelected = (seatId : string) =>{
    setSeats((prevSeats)=>
    prevSeats.map((seat)=>
    seat.id === seatId && !seat.booked
    ? {...seat, selected:!seat.selected}
    :seat));
  }


  const seatSelected = seats.filter((seat)=>seat.selected);
  const totalCost = seatSelected.reduce((total,seat) =>
    total + seat.price,0
  )
  const groupedSeats = seats.reduce((acc: any, seat: any) => {
  if (!acc[seat.row]) {
    acc[seat.row] = [];
  }
  acc[seat.row].push(seat);
  return acc;
}, {});


  const navigate= useNavigate();
  return (
    <div>
      <div className="flex-1 flex flex-col items-center max-md:mt-16 
      ">
        <h1 className="mt-25 p-2 text-4xl font-semibold text-center text-white h-1/2">

          Select Your Seat
        </h1>
        <img
         src={screenImage}
         alt="screen"
         >
        </img>
        <p>
          Screen Side
        </p>
        <div>

        </div>
        <div className="mt-6 space-y-6">
          {Object.keys(groupedSeats).map((row) => {
    
          const rowSeats = groupedSeats[row];

          let category = "";
          if (["A", "B", "C"].includes(row)) category = "Regular";
          if (["D", "E"].includes(row)) category = "Premium";
          if (["F"].includes(row)) category = "Recliner";

          return (
          <div key={row}>
        
          {(row === "A" || row === "D" || row === "F") && (
            <h3 className="text-lg font-semibold text-center text-white mb-2">
              {category} Seats
            </h3>
          )}

        <div className="grid grid-cols-5 gap-4 ">
          {rowSeats.map((seat: any) => (
            <button
              key={seat.id}
              disabled={seat.booked}
              onClick={() => handleSeatSelected(seat.id)}
              className={`w-10 h-10 rounded
                ${
                  seat.booked
                    ? "bg-red-700 cursor-not-allowed"
                    : seat.selected
                    ? "bg-green-600"
                    : "bg-gray-700 hover:bg-gray-500"
                }`}
            >
              {seat.id}
            </button>
          ))}
          </div>
      </div>
    );
  })}
</div>


        <div className="items-center gap-2 mt-6">
          <p>
            Selected seats:{" "}
            {seatSelected.length>0
            ?seatSelected.map((s)=>s.id).join(", ")
          :"NONE"}
          </p>
          <p>
            Total Price:
            ₹ {totalCost}
          </p>

          <button
          disabled={seatSelected.length === 0}
          onClick={() => navigate("/mybookings")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Proceed
        </button>
        </div>

      </div>

    </div>
  )
}

export default SeatLayout
