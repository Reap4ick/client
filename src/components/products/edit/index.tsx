import { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, UploadFile, Space, InputNumber, Select } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import { IProductEdit } from '../../interfaces/products';
import { http_common } from "../../../env";
import { ICategoryItem } from "../../home/types.ts";

export interface ICategoryName {
    id: number;
    name: string;
}

const ProductEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm<IProductEdit>();
    const [categories, setCategories] = useState<ICategoryName[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        // Отримання категорій
        http_common.get<ICategoryItem[]>("/api/Categories")
            .then(resp => setCategories(resp.data))
            .catch(error => console.error("Error fetching categories:", error));

        // Отримання продукту для редагування
        http_common.get<IProductEdit>(`/api/Products/${id}`)
            .then(resp => {
                form.setFieldsValue(resp.data);

                // Форматування існуючих зображень для відображення
                if (resp.data.images) {
                    const existingImages = resp.data.images.map(image => {
                        const imageName = image.substring(image.lastIndexOf('/') + 1);
                        const imageUrl = `${http_common.defaults.baseURL}/images/300_${imageName}`;
                        return {
                            uid: imageUrl,
                            name: imageName,
                            status: 'done',
                            url: imageUrl,
                        } as UploadFile;
                    });
                    setFileList(existingImages);
                }
            })
            .catch(error => console.error("Error fetching product data:", error));
    }, [id, form]);

    const onSubmit = async (values: IProductEdit) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "images" && Array.isArray(value)) {
                    value.forEach(file => formData.append("images", file));
                } else {
                    formData.append(key, value as any);
                }
            });

            await http_common.put(`/api/Products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate(`/products`);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleChange = (info: UploadChangeParam) => {
        setFileList(info.fileList);
    };

    return (
        <>
            <p className="text-center text-3xl font-bold mb-7">Edit Product</p>
            <Form form={form} onFinish={onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Form.Item name="name" label="Name" hasFeedback rules={[{ required: true, message: 'Please provide a valid product name.' }]}>
                    <Input placeholder='Type product name' />
                </Form.Item>

                <Form.Item name="price" label="Price" hasFeedback rules={[{ required: true, message: 'Please enter product price.' }]}>
                    <InputNumber addonAfter="$" placeholder='0.00' />
                </Form.Item>

                <Form.Item name="categoryId" label="Category" hasFeedback rules={[{ required: true, message: 'Please choose the category.' }]}>
                    <Select placeholder="Select a category">
                        {categories.map(c => (
                            <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="images"
                    label="Photo"
                    rules={[{ required: true, message: "Please choose a photo for the product." }]}
                    getValueFromEvent={(e: UploadChangeParam) => e.fileList.map(file => file.originFileObj)}
                >
                    <Upload
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={10}
                        listType="picture-card"
                        onPreview={(file) => {
                            setPreviewImage(file.url || URL.createObjectURL(file.originFileObj as RcFile));
                            setPreviewOpen(true);
                            setPreviewTitle(file.name || '');
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
                    <Space>
                        <Link to={"/products"}>
                            <Button htmlType="button" className='text-white bg-gradient-to-br from-red-400 to-purple-600 font-medium rounded-lg px-5'>Cancel</Button>
                        </Link>
                        <Button htmlType="submit" className='text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg px-5'>Update</Button>
                    </Space>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default ProductEditPage;
