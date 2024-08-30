import React from "react";
import heroImage from "../assets/food.jpg";

const Header = () => {
  return (
    <header className="shadow-full sticky top-0 z-50 h-[15vh]">
      <img
        src={heroImage}
        alt="Delicious food"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-6xl font-bold z-10">Yumely</h1>
      </div>
    </header>
  );
};

export default Header;
