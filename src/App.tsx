import React from "react";
import CreateCategory from "./components/CreateCategory";
import CategoryList from "./components/CategoryList";


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Category Management</h1>
      <CreateCategory />
      <CategoryList />
    </div>
  );
};

export default App;
