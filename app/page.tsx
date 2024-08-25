"use client";
import type {
  Guest,
  Room,
} from "./utils/getDefaultRoomAllocation";
import RoomAllocation from "./components/RoomAllocation/RoomAllocation";

const guest: Guest = { adult: 7, child: 3 };
const rooms: Room[] = [
  { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
  { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
];

export default function Home() {
  return (
    <RoomAllocation
      guest={guest}
      rooms={rooms}
      onChange={(result) => console.log(result)}
    />
  );
}
