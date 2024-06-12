import axios from "axios";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { useState } from "react";

function AttractionList() {
  const [attractions, setAttractions] = useState([]);
  const [searchAttraction, setSearchAttraction] = useState("");

  const getDataFromServer = async () => {
    try {
      const getAttraction = await axios.get(
        `http://localhost:4001/trips?keywords=${searchAttraction}`
      );
      setAttractions(getAttraction.data.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, [searchAttraction]);
  return (
    <>
      <div className="w-[80%]">
        <p>ค้นหาที่เที่ยว</p>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="w-full text-center border-b-2"
          onChange={(event) => {
            setSearchAttraction(event.target.value);
          }}
        />
      </div>
      <div
        id="AttractionList"
        className="w-[90%] mt-10 mb-10 flex flex-col gap-10"
      >
        {attractions.map((attraction) => {
          return (
            <div className="flex gap-6">
              <img
                src={attraction.photos[0]}
                alt={attraction.title}
                width={400}
                height={400}
                className="border rounded-2xl"
              />
              <div id="AttractionDetail" className="">
                <h3 className="text-xl font-bold">{attraction.title}</h3>
                <p className="text-xs text-gray-400">
                  {attraction.description.slice(0, 100)}{" "}
                  <a
                    href={attraction.url}
                    target="_blank"
                    className="text-sm text-blue-400 underline"
                  >
                    อ่านต่อ
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AttractionList;
