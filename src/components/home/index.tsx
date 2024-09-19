import { useEffect, useState } from "react";
import { ICategoryItem } from "./types.ts";
import { API_URL, http_common } from "../../env";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";

const HomePage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        http_common.get<ICategoryItem[]>("/api/categories")
            .then(resp => {
                console.log("list", resp);
                setList(resp.data);
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setError("Не вдалося завантажити категорії.");
            });
    }, []);

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            try {
                await http_common.delete(`/api/categories/${deleteId}`);
                setList(list.filter(item => item.id !== deleteId));
                setIsModalOpen(false);
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };

    return (
        <>
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Категорії</h1>
                <Link to="/create">
                    <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
                        Створити нову категорію
                    </button>
                </Link>
            </div>

            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {list.map(item => (
                        <div key={item.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={`${API_URL}/images/300_${item.image}`} alt={item.name} />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>

                                {/* Кнопки редагування та видалення */}
                                <div className="flex gap-2">
                                    <Link to={`/edit/${item.id}`}>
                                        <Button className="bg-green-500 text-white">Редагувати</Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white"
                                    >
                                        Видалити
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Модальне вікно для підтвердження видалення */}
            <Modal
                title="Підтвердження видалення"
                open={isModalOpen}
                onOk={confirmDelete}
                onCancel={cancelDelete}
                okText="Так, видалити"
                cancelText="Скасувати"
            >
                <p>Ви дійсно хочете видалити цю категорію?</p>
            </Modal>
        </>
    );
}

export default HomePage;
