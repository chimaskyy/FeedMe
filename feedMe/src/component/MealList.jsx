import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MealList = ({
  meals,
  search,
  handlePagination,
  currentPage,
  mealsPerPage,
}) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);

  const indexOfLastItem = currentPage * mealsPerPage;
  const indexOfFirstItem = indexOfLastItem - mealsPerPage;
  const currentmeals = meals
    .filter((item) => {
      return search.toLowerCase() === ""
        ? true
        : item.name.toLowerCase().includes(search.toLowerCase());
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(meals.length / mealsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle click outside of the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenModal = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMeal(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentmeals.map((meal) => (
          <article
            key={meal.id}
            className="border-2 relative bg-white rounded-lg mb-4 p-4"
          >
            <div className="border-3 border-gray-300 p-4">
              <h2 className="text-lg font-semibold">{meal.name}</h2>
              <p className="text-lg text-[#2d6e2a]">{meal.type}</p>
              <button
                onClick={() => handleOpenModal(meal)}
                className="mt-4 bg-[#2d6e2a] text-white py-2 px-4 rounded hover:bg-[#2f753b] flex lg:justify-start"
              >
                View Ingredients
              </button>
            </div>
            {modalVisible && selectedMeal === meal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div
                  ref={modalRef}
                  className="bg-white w-full max-w-lg mx-4 p-6 rounded-lg shadow-lg relative"
                >
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  >
                    &times;
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                  <ul className="list-disc list-inside">
                    {meal.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-2">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePagination(number)}
            className={`mx-1 ${
              number === currentPage
                ? "bg-[#2d6e2a] text-white"
                : "bg-gray-300 text-black"
            } py-2 px-4 rounded-lg`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MealList;
