import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { RotatingLines } from "react-loader-spinner";

const Home = () => {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMealType = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Breakfast";
    if (hour < 18) return "Lunch";
    return "Dinner";
  };

  const fetchMeal = async () => {
    const mealType = getMealType();
    try {
      const response = await axios.get(
        `https://feedme-api.onrender.com/meals/type/${mealType}`
      );
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setMeal(response.data[randomIndex]);
      } else {
        setError("No meal available for this type. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
      setError("Failed to fetch a meal. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const handleGetAnotherRecipe = () => {
    setLoading(true);
    fetchMeal().then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="h-[85vh] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center lg:flex-row lg:space-x-8 w-full max-w-6xl mx-auto p-6">
        <div className="mt-24 w-full lg:w-1/2 max-w-2xl mx-auto">
          <h1 className="text-center text-3xl font-bold mt-6 font-serif">
            Welcome, Food Lover!
          </h1>
          <p className="mt-4 text-center text-xl md:px-6 lg:px-8 font-sans">
            Buckle up your taste buds! Whether you're dreaming of a breakfast
            fit for a king, a lunch that’ll make your coworkers jealous, or a
            dinner that’s straight-up magical, we’ve got the scrumptious secrets
            just for you. Dive in, explore our recipes, and let’s get cooking up
            some delicious fun!
          </p>
          <div className="flex items-center justify-center mb-6 mt-8">
            <Link to="/recipes" className="text-lg underline font-sans">
              <Button
                colorScheme="orange"
                size="sm"
                className="p-2 bg-[#2d6e2a] text-white rounded-full"
                onClick={handleGetAnotherRecipe}
              >
                Explore Recipes
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 w-full lg:w-1/2 flex flex-col items-center">
          <p className="font-bold text-2xl font-sans mb-4">
            Let’s get you started with a recipe for{" "}
            <span className="text-[#2d6e2a]">{meal ? meal.type : "today"}</span>
            :
          </p>
          {loading ? (
            <div className="flex justify-center h-64">
              <RotatingLines
                height="30"
                width="30"
                strokeWidth="3"
                animationDuration="0.75"
                strokeColor="green"
                ariaLabel="rotating-lines-loading"
                visible={true}
              />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : meal ? (
            <div className="bg-white w-full max-w-sm mx-auto p-4 shadow-md rounded-lg flex flex-col h-full">
              <div className="mb-6 flex-grow overflow-y-auto">
                <h2 className="font-bold text-2xl mb-2 font-serif">
                  {meal.name}
                </h2>
                <h3 className="font-bold text-xl mb-2 font-serif">
                  Ingredients:
                </h3>
                <ul className="list-disc list-inside mb-4 text-left text-xl font-sans">
                  {meal.ingredients && meal.ingredients.length > 0 ? (
                    meal.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))
                  ) : (
                    <li>No ingredients listed</li>
                  )}
                </ul>
              </div>
              <Button
                colorScheme="orange"
                size="sm"
                className="p-2 bg-[#2d6e2a] text-white rounded-full self-center"
                onClick={handleGetAnotherRecipe}
              >
                Try Another Recipe
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
