import axios from "axios";
import { useEffect, useState } from "react";
import CopyClipboard from "./CopyToClipboard";

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
      <section className="w-[60%]">
        <p>ค้นหาที่เที่ยว</p>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="w-full text-center border-b-2"
          onChange={(event) => {
            setSearchAttraction(event.target.value);
          }}
          value={searchAttraction}
        />
      </section>
      <section
        id="AttractionList"
        className="w-[70%] mt-10 mb-10 flex flex-col gap-10 "
      >
        {attractions.map((attraction) => {
          return (
            <div
              key={attraction.eid}
              id="firstImageAttraction"
              className="flex gap-6"
            >
              <img
                src={attraction.photos[0]}
                alt={attraction.title}
                className="w-80 h-80 border rounded-3xl"
              />
              <div id="AttractionDetail">
                <a
                  href={attraction.url}
                  target="_blank"
                  className="text-2xl font-bold"
                >
                  {attraction.title}
                </a>
                <p className="text-gray-400 font-bold">
                  {attraction.description.slice(0, 100)}
                  <br></br>
                  <a
                    href={attraction.url}
                    target="_blank"
                    className=" text-blue-400 underline"
                  >
                    อ่านต่อ
                  </a>
                </p>
                <p id="Category" className="flex gap-1 text-gray-400 ">
                  หมวดหมู่
                  {attraction.tags.map((tag, index) => {
                    let text = "";
                    {
                      index === attraction.tags.length - 1
                        ? (text = "และ ")
                        : "";
                    }
                    return (
                      <>
                        <span>{text}</span>
                        <button
                          className="underline"
                          onClick={() => {
                            let newSearch = searchAttraction;
                            if (!newSearch.includes(tag)) {
                              newSearch += " " + tag;
                            }
                            setSearchAttraction(newSearch.trim());
                          }}
                        >
                          {tag}
                        </button>
                      </>
                    );
                  })}
                </p>
                <figure id="imageAttraction" className="mt-5 flex gap-6">
                  {attraction.photos.map((photo) => {
                    if (photo !== attraction.photos[0]) {
                      return (
                        <img
                          src={photo}
                          alt={attraction.title}
                          className="w-[90px] h-[90px] border rounded-xl"
                        />
                      );
                    }
                  })}
                </figure>
              </div>
              <CopyClipboard url={attraction.url} />
            </div>
          );
        })}
      </section>
    </>
  );
}

export default AttractionList;
