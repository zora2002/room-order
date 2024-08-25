export interface Guest {
  adult: number;
  child: number;
}

export interface Room {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export interface RoomAllocation {
  adult: number;
  child: number;
  price: number;
}

export const getPrice = (adult: number, child: number, room: Room) => {
  return room.roomPrice + (room.adultPrice * adult) + (room.childPrice * child);
} 

const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]): RoomAllocation[] => {
  const { adult, child } = guest;
  const defaultRooms: RoomAllocation[] = [];

  if (child > 0 && adult < 1) {
    return defaultRooms
  }

  let restAdult = adult
  let restChild = child

  for (const room of rooms) {
    const { capacity } = room;

    const totalAdults = restChild > 0 ? 1 : Math.min(restAdult, capacity);
    const totalChildren = restChild > 0 ? Math.min(restChild, capacity - 1) : 0;
    restAdult = restAdult - totalAdults
    restChild = restChild - totalChildren

    const totalRoomPrice = getPrice(totalAdults, totalChildren, room)

    defaultRooms.push({
      adult: totalAdults,
      child: totalChildren,
      price: totalRoomPrice,
    });
  }

  return defaultRooms;
};



export default getDefaultRoomAllocation


// // 測試案例 1
// const guest1 = { adult: 4, child: 2 };
// const rooms1 = [
//   { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
//   { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
//   { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
// ];

// const defaultRooms1 = getDefaultRoomAllocation(guest1, rooms1);
// console.log("Test Case 1 - Default Rooms:", defaultRooms1);
// const totalPrice1 = defaultRooms1.reduce((acc, val) => acc + val.price, 0);
// console.log("Test Case 1 - Total Price:", totalPrice1);

// // 測試案例 2
// const guest2 = { adult: 16, child: 0 };
// const rooms2 = [
//   { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
//   { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
//   { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
//   { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
// ];

// const defaultRooms2 = getDefaultRoomAllocation(guest2, rooms2);
// console.log("Test Case 2 - Default Rooms:", defaultRooms2);
// const totalPrice2 = defaultRooms2.reduce((acc, val) => acc + val.price, 0);
// console.log("Test Case 2 - Total Price:", totalPrice2);

// // 測試案例 3
// const guest3 = { adult: 0, child: 1 };
// const rooms3 = [
//   { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
//   { roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
//   { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
// ];
// const defaultRooms3 = getDefaultRoomAllocation(guest3, rooms3);
// console.log("Test Case 3 - Default Rooms:", defaultRooms3);
// const totalPrice3 = defaultRooms3.reduce((acc, val) => acc + val.price, 0);
// console.log("Test Case 3 - Total Price:", totalPrice3);
