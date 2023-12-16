import { useState } from "react";
import BookImg from "./../../assets/book3.jpg";

const Detail = () => {
  const [purchased, setPurchased] = useState<boolean[]>([false, false, false]);
  const [showView, setShowView] = useState<boolean[]>([false, false, false]);

  const handleBuyClick = (index: number) => {
    const updatedPurchased = [...purchased];
    updatedPurchased[index] = true;
    setPurchased(updatedPurchased);

    const updatedShowView = [...showView];
    updatedShowView[index] = true;
    setShowView(updatedShowView);
  };

  return (
    <div className="ml-12 flex">
      <div className="flex items-start flex-col">
        <h1 className="font-bold text-2xl">Streak Content</h1>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-x-8 mt-4">
          {[0, 1, 2].map((sectionIndex) => (
            <section
              key={sectionIndex}
              className="pb-3 bg-white border-2 rounded-2xl flex flex-col items-center p-2"
            >
              <img src={BookImg} alt="" className="w-32 h-40 pt-3" />
              <p>School level Guidelines</p>
              <div className="flex mt-4 flex-wrap gap-2">
                {!showView[sectionIndex] && (
                  <>
                    <button className="flex-grow bg-blue-400 text-white p-1 rounded-xl text-sm">
                      Preview
                    </button>
                    <button
                      className="flex-grow bg-blue-400 pl-4 pr-4 text-white p-1 rounded-xl text-sm"
                      onClick={() => handleBuyClick(sectionIndex)}
                    >
                      Buy
                    </button>
                  </>
                )}
                {showView[sectionIndex] && (
                  <button className="flex-grow bg-blue-400 pl-4 pr-4 text-white p-1 rounded-xl text-sm">
                    View
                  </button>
                )}
              </div>
            </section>
          ))}
        </div>
        <div className="w-48 lg:w-96 ml-0 lg:ml-24 bg-white mt-8 mb-8 flex flex-col lg:flex-row items-center justify-between p-3 rounded-xl">
          <div className="">
            <p className="text-xs">Your exam schedule on</p>
            <h2>
              19th November 2023,
              <br />
              10am to 11:30am
            </h2>
          </div>
          <button className="bg-blue-300 w-24 h-10 text-white py-1 px-3 rounded-md">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
