import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Row, Upload, UploadFile } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { ICategoryEdit, IUploadedFile } from "./types";
import { API_URL, http_common } from "../../../env";
import Loader from "../../common/Loader"; // Імпортуємо компонент Loader

const CategoryEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm<ICategoryEdit>();

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [category, setCategory] = useState<ICategoryEdit | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Додаємо стан для лоадера

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true); // Включаємо лоадер
            try {
                const response = await http_common.get<ICategoryEdit>(`${API_URL}/api/categories/${id}`);
                setCategory(response.data);
                form.setFieldsValue(response.data);

                if (response.data.image) {
                    setFileList([{
                        uid: '-1',
                        name: response.data.image,
                        status: 'done',
                        url: `${API_URL}/images/300_${response.data.image}` // Додаємо префікс розміру
                    }]);
                }
            } catch (err) {
                console.error("Error fetching category:", err);
            } finally {
                setLoading(false); // Вимикаємо лоадер
            }
        };
        fetchCategory();
    }, [id, form]);

    const onSubmit = async (values: ICategoryEdit) => {
        setLoading(true); // Включаємо лоадер
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description || "");

        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("newImage", fileList[0].originFileObj as RcFile);
        }

        try {
            await http_common.put(`${API_URL}/api/categories/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating category:", error);
        } finally {
            setLoading(false); // Вимикаємо лоадер
        }
    };

    const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const file = info.fileList[0] as IUploadedFile;

        form.setFieldsValue({ image: file.originFileObj });
        setFileList(info.fileList);

        if (!file.url && !file.preview) {
            file.preview = URL.createObjectURL(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    return (
        <>
            {loading && <Loader />} {/* Відображаємо лоадер під час завантаження */}

            <h1 className={"text-center text-3xl font-bold tracking-tight text-gray-900 mb-2"}>Редагувати категорію</h1>

            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
                initialValues={category}
            >

                <Form.Item
                    label={"Назва"}
                    name={"name"}
                    rules={[
                        { required: true, message: "Це поле є обов'язковим!" },
                        { min: 3, message: "Довжина поля має бути не менше 3 символів" }
                    ]}
                >
                    <Input autoComplete="name"
                        className={"block w-full px-5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"} />
                </Form.Item>

                <Form.Item
                    label={"Опис"}
                    name={"description"}
                    rules={[{ max: 4000, message: "Опис не може бути більше ніж 4000 символів" }]}
                >
                    <Input.TextArea rows={4}
                        className={"block w-full px-5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"} />
                </Form.Item>

                <div className="flex items-center col-span-2 gap-x-2">
                    <Form.Item
                        name="image"
                        label="Фото"
                    >
                        <Upload
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            fileList={fileList}
                            onChange={handleImageChange}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>

                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ margin: 10 }}
                        className={"text-white capitalize transition-colors duration-300 transform bg-blue-500"}
                        type="primary" htmlType="submit">
                        Зберегти
                    </Button>
                    <Link to={"/"}>
                        <Button style={{ margin: 10 }} htmlType="button">
                            Скасувати
                        </Button>
                    </Link>
                </Row>

            </Form>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}

export default CategoryEditPage;
