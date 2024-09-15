import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5035/api/Categories");
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 p-4">Loading categories...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {categories.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">No categories available</div>
      ) : (
        categories.map((category) => (
          <div key={category.id} className="bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {category.image && (
              <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold">{category.name}</h2>
              {category.description && <p className="mt-2 text-gray-300">{category.description}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
