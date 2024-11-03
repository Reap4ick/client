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
    const [deletedPhotoNames, setDeletedPhotoNames] = useState<string[]>([]);

    useEffect(() => {
        http_common.get<ICategoryItem[]>("/api/Categories")
            .then(resp => setCategories(resp.data))
            .catch(error => console.error("Error fetching categories:", error));

        http_common.get<IProductEdit>(`/api/Products/${id}`)
            .then(resp => {
                form.setFieldsValue(resp.data);

                if (resp.data.images) {
                    const existingImages = resp.data.images.map((image, index) => {
                        const imageName = image.substring(image.lastIndexOf('/') + 1);
                        const imageUrl = `${http_common.defaults.baseURL}/images/300_${imageName}`;
                        return {
                            uid: String(index),  // Використовуємо індекс для унікальності
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
    
            formData.append("Id", String(id));
            formData.append("CategoryId", String(values.categoryId));
            formData.append("Name", values.name || "");
            formData.append("Price", String(values.price || ""));
    
            formData.append("CategoryList", JSON.stringify([]));
    
            const existingImages = fileList.map(file => 
                typeof file.url === "string" 
                    ? file.url.substring(file.url.lastIndexOf('/') + 1) 
                    : file.name
            );
            formData.append("Images", JSON.stringify(existingImages));
    
            const newImages = fileList
                .filter(file => file.originFileObj)
                .map(file => file.originFileObj as RcFile);
    
            newImages.forEach(file => {
                if (file) formData.append("NewImages", file);
            });
    
            deletedPhotoNames.forEach(photoName => formData.append("DeletedPhotoNames", photoName));
    
            await http_common.put(`/api/Products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate('/products');
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    
    
    const handleChange = (info: UploadChangeParam) => {
        setFileList(info.fileList);
        console.log("Current file list:", info.fileList); // Логування поточного списку файлів
    };
    
    

    // const handleChange = (info: UploadChangeParam) => {
    //     setFileList(info.fileList);
    // };

    const handleRemove = (file: UploadFile) => {
        if (file.name && !file.originFileObj) {
            setDeletedPhotoNames(prev => [...prev, file.name]);
        }
        return true;
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
                >
                    <Upload
                        fileList={fileList}
                        onChange={handleChange}
                        onRemove={handleRemove}
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
