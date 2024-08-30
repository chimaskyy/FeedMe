import { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import MealList from "../MealList";
import { Link } from "react-router-dom";
import data from "../../data/meals.json";

const Meals = () => {
  const [meals, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipeType, setRecipeType] = useState("all");
  // const [error, setError] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    setLoading(true);
    getAllMeal();
  }, [currentPage, recipeType]);

  function getAllMeal() {
    setLoading(true);
    let filteredMeals = data;

    if (recipeType !== "all") {
      filteredMeals = data.filter(
        (meal) => meal.type.toLowerCase() === recipeType
      );
    }

    setMeal(filteredMeals);
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getAllMeal();
  };

  const searchHandler = (e) => {
    let value = e.target.value;
    setSearch(value);
    if (value !== "") setSearching(true);
    else setSearching(false);
    // setSearch("")
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecipeType = (type) => {
    setRecipeType(type);
    setCurrentPage(1);
  };

  // Helper function to determine button class based on active state
  const getButtonColor = (type) => {
    return recipeType === type
      ? "p-2 bg-[#2d6e2a] text-white rounded-lg"
      : "p-2 bg-gray-200 text-[#2d6e2a] rounded-lg hover:bg-[#71b56d] hover:text-white";
  };

  return (
    <div className={`min-h-screen p-6 ${searching ? "h-screen" : "h-full"}`}>
      <div className="flex items-center justify-center mb-6">
        <input
          className="border border-slate-300 shadow-sm rounded mt-5 text-start px-2 py-1 w-1/2 md:py-2 md:w-1/3 lg:w-1/4"
          placeholder="Search meals by name"
          onChange={searchHandler}
        />
      </div>
      <div className="flex justify-center gap-12 m-8 p-8">
        <button
          onClick={() => handleRecipeType("all")}
          className={getButtonColor("all")}
        >
          All Recipe
        </button>
        <button
          onClick={() => handleRecipeType("breakfast")}
          className={getButtonColor("breakfast")}
        >
          Breakfast
        </button>
        <button
          onClick={() => handleRecipeType("lunch")}
          className={getButtonColor("lunch")}
        >
          Lunch
        </button>
        <button
          onClick={() => handleRecipeType("dinner")}
          className={getButtonColor("dinner")}
        >
          Dinner
        </button>
        <button
          onClick={() => handleRecipeType("dessert")}
          className={getButtonColor("dessert")}
        >
          Dessert
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RotatingLines
            height="30"
            width="30"
            strokeWidth="5"
            animationDuration="0.75"
            strokeColor="#5b9c57"
            ariaLabel="rotating-lines-loading"
            visible={true}
          />
        </div>
      ) : (
        <MealList
          meals={meals}
          search={search}
          handlePagination={handlePagination}
          currentPage={currentPage}
          mealsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default Meals;
