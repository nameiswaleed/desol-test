import React from "react";

const NoCarsMessage = ({ onClickAddCars }) => {
  return (
    <div className=" container flex flex-col items-center justify-center h-screen">
      <p className="text-xl mb-4">There are no cars to show.</p>
      <button
        onClick={onClickAddCars}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-600"
      >
        Add Cars
      </button>
    </div>
  );
};

export default NoCarsMessage;
