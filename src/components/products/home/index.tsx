import { useEffect, useState } from "react";
import { IProductItem } from "./types.ts";
import { API_URL, http_common } from "../../../env";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [list, setList] = useState<IProductItem[]>([]);

    useEffect(() => {
        http_common.get<IProductItem[]>("/api/products")
            .then(resp => {
                setList(resp.data);
            });
    }, []);

    return (
        <>
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-2">Продукти</h1>
            <div className="mb-4">
                <Link to="/create"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Додати новий продукт
                </Link>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {list.map(item => (
                    <div key={item.id}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src={`${API_URL}/images/${item.image}`} alt={item.name} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                            </a>
                            <p className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-400">${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default HomePage;
