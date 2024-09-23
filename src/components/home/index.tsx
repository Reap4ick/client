import { useEffect, useState } from "react";
import { ICategoryItem } from "./types.ts";
import { API_URL, http_common } from "../../env";
import { Link } from "react-router-dom";
import { DeleteDialog } from "../common/DeleteDialog.tsx";

const HomePage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http_common.get<ICategoryItem[]>("/api/categories")
            .then(resp => {
                setList(resp.data);
            });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete("api/categories/" + id);
            setList(list.filter(item => item.id !== id));
        } catch { }
    };

    return (
        <>
            <h1 className={"text-center text-3xl font-bold tracking-tight text-gray-900 mb-2"}>Категорії</h1>
            <div>
                <Link to="/create"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Додати
                </Link>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {list.map(item =>
                    <div
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src={API_URL + "/images/300_" + item.image} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                            <div className="flex space-x-2">
                                <DeleteDialog
                                    title={"Ви впевнені?"}
                                    description={`Дійсно бажаєте видалити '${item.name}'?`}
                                    onSubmit={() => handleDelete(item.id)}
                                />
                                <Link
                                    to={`/edit/${item.id}`} // Передаємо ID категорії у URL для сторінки редагування
                                    className="text-gray-500 dark:text-gray-300 dark:hover:text-yellow-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 5.487a2.25 2.25 0 10-3.182-3.182l-9.53 9.53a4.5 4.5 0 00-1.155 2.013l-.564 2.25a.75.75 0 00.918.918l2.25-.564a4.5 4.5 0 002.013-1.155l9.53-9.53z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 12.75V19.5a2.25 2.25 0 01-2.25 2.25h-12A2.25 2.25 0 013 19.5v-12A2.25 2.25 0 015.25 5.25h6.75"
                                        />
                                    </svg>
                                </Link>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;
