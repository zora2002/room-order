"use client";
import { useEffect, useMemo, useState } from "react";

import getDefaultRoomAllocation, {
  Guest,
  Room,
  RoomAllocation as Result,
  getPrice,
} from "../../utils/getDefaultRoomAllocation";
import CustomInputNumber from "../CustomInputNumber/CustomInputNumber";

import './RoomAllocation.css'

interface RoomAllocationProps {
  guest: Guest;
  rooms: Room[];
  onChange: (result: Result[]) => void;
}

enum Age {
  Adult = 1,
  Child,
}

const Oops = () => {
  return <div className="oops">Oops...Please contact customer service</div>;
};

const RoomAllocation: React.FC<RoomAllocationProps> = ({
  guest,
  rooms,
  onChange,
}) => {
  const [list, setList] = useState(getDefaultRoomAllocation(guest, rooms));
  const hasRoom = useMemo(() => {
    return {
      adult: list.reduce((sum, item) => sum + item.adult, 0),
      child: list.reduce((sum, item) => sum + item.child, 0),
    };
  }, [list]);

  useEffect(() => {
    onChange(list);
  }, [list]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    arr: Result[],
    AgeType: Age
  ) => {
    let { adult, child } = arr[index];
    adult = AgeType === Age.Adult ? Number(event.target.value) : adult;
    child = AgeType === Age.Child ? Number(event.target.value) : child;
    const price = getPrice(adult, child, rooms[index]);

    let newList: Result[] = [];
    arr.forEach((i, idx) =>
      newList.push(index === idx ? { adult, child, price } : i)
    );
    setList(newList);
  };

  return (
    <div className="order">
      <div className="situation">
        住客人數：{guest.adult} 位大人，{guest.child} 位小孩 / {rooms.length} 房
      </div>
      {list.length > 0 ? (
        <>
          <div className="notyet">
            尚未分配人數 : {guest.adult - hasRoom.adult} 位大人，{" "}
            {guest.child - hasRoom.child} 位小孩
          </div>
          <div className="room-list">
            {list.map((r, index, arr) => {
              return (
                <div className="room" key={index}>
                  <div className="room-people">
                    房間: {r.child + r.adult} 人
                  </div>
                  <div className="room-setting adult">
                    <div className="type">
                      大人<span>年齡20+</span>
                    </div>
                    <CustomInputNumber
                      min={0}
                      max={rooms[index].capacity}
                      step={1}
                      name="customNumber"
                      value={r.adult.toString()}
                      maxDisabled={
                        // 不能超過房間容納人數
                        // 不能超過總大人人數
                        r.child + r.adult >= rooms[index].capacity ||
                        hasRoom.adult >= guest.adult
                      }
                      minDisabled={r.adult <= 1}
                      onChange={(e) => handleChange(e, index, arr, Age.Adult)}
                    />
                  </div>
                  <div className="room-setting child">
                    <div className="type">小孩</div>
                    <CustomInputNumber
                      min={0}
                      max={rooms[index].capacity}
                      step={1}
                      name="customNumber"
                      value={r.child.toString()}
                      maxDisabled={
                        // 不能超過房間容納人數
                        // 不能超過總小孩人數
                        r.child + r.adult >= rooms[index].capacity ||
                        hasRoom.child >= guest.child
                      }
                      minDisabled={r.child === 0}
                      onChange={(e) => handleChange(e, index, arr, Age.Child)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Oops />
      )}
    </div>
  );
};

export default RoomAllocation;
