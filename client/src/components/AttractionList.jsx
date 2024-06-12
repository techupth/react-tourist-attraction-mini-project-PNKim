import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
              <div id="AttractionDetail" className="">
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
                <p
                  id="Category"
                  className="flex gap-1 text-gray-400 font-bold "
                >
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
                            newSearch += " " + tag;
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
              <CopyToClipboard text={attraction.url}>
                <button className="w-14 h-14 border rounded-full bg-blue-400 self-end">
                  Copy Url
                </button>
              </CopyToClipboard>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default AttractionList;
