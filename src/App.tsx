import MainLayout from "./components/containers/default";
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/home";
import CategoryCreatePage from "./components/categories/create";
import EditCategoryPage from "./components/categories/edit";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="create" element={<CategoryCreatePage />} />|
                    <Route path="/edit/:id" element={<EditCategoryPage />} />

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    {/*<Route path="*" element={<NoMatch />} />*/}
                </Route>
            </Routes>
        </>
    )
}


// import React from "react";
// import CreateCategory from "./components/CreateCategory";
// import CategoryList from "./components/CategoryList";


// const App: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Category Management</h1>
//       <CreateCategory />
//       <CategoryList />
//     </div>
//   );
// };

// export default App;








