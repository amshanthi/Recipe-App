import { useEffect, useState } from "react";
function ProductList({ search }) {
  let [result, setResult] = useState([]);
  let [detail, setDetail] = useState(null);
  const recipeHandler = (item) => {
    setDetail(item);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/recipes");
      const result = await response.json();
      setResult(result.recipes);
    }
    fetchData();
  }, []);

  const filteredArray = result.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div>
      {detail && (
        <div className="p-4 flex justify-center">
          <div className="w-full max-w-5xl bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <button
              onClick={() => setDetail(null)}
              className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-gray-800 px-5 py-2 rounded-full hover:scale-105 transition"
            >
              ← Back
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* LEFT */}
              <div className="md:w-1/2 text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                  {detail.name}
                </h1>

                <img
                  src={detail.image}
                  alt={detail.name}
                  className="w-80 h-80 mx-auto object-cover rounded-xl shadow-2xl"
                />
              </div>

              {/* RIGHT */}
              <div className="md:w-1/2 bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-yellow-300">
                  Ingredients
                </h2>

                <ul className="list-disc pl-5 mb-4 text-gray-800">
                  {detail.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h2 className="text-xl font-bold mb-2 text-yellow-300">
                  Instructions
                </h2>

                <ol className="list-decimal pl-5 text-gray-800">
                  {detail.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 ">
        {detail == null &&
          filteredArray.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-4 m-4 text-center 
hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition duration-300 "
              >
                <h2 className="text-lg  font-bold text-red-700 ">
                  {item.name}
                </h2>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-yellow-400 shadow-md"
                />
                <div className="flex  md:flow-row  justify-between  ">
                  <p className="flex justify-start p-2">
                    ⭐ Rating: {item.rating}
                  </p>
                  <button
                    id={item.id}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-orange-500 hover:to-yellow-400 transition duration-300"
                    onClick={() => {
                      recipeHandler(item);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductList;
