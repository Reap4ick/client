import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IProductItem } from '../../interfaces/products';
import { Carousel, Button } from 'antd';
import { API_URL, http_common } from "../../../env";

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductItem | null>(null);

    useEffect(() => {
        if (id) {
            http_common.get<IProductItem>(`/api/Products/${id}`)
                .then(resp => {
                    setProduct(resp.data);
                })
                .catch(error => console.error("Failed to load product details:", error));
        }
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className='max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg'>
            <h2 className='text-5xl font-extrabold text-center mb-8 text-gray-800'>
                {product.name}
            </h2>

            <Carousel
                arrows
                infinite={false}
                className="mb-8 rounded-lg overflow-hidden shadow-md"
            >
                {product.images.map((image, i) => (
                    <div key={i}>
                        <img
                            src={`${API_URL}/images/1200_${image}`}
                            alt={product.name}
                            className='w-full h-96 object-cover'
                        />
                    </div>
                ))}
            </Carousel>

            <div className='text-center mb-6'>
                <div className='inline-block py-3 px-6 bg-teal-600 text-white text-2xl font-semibold rounded-full shadow-sm'>
                    Price: {product.price}$
                </div>
            </div>

            <div className='bg-white p-6 shadow-md rounded-lg'>
                <h3 className='text-2xl font-bold mb-4 text-teal-700'>Description</h3>
                <div
                    className="text-gray-700 text-lg leading-relaxed description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </div>

            <div className='flex justify-center mt-8'>
                <Link to="/products">
                    <Button type="primary" size="large" className="rounded-lg">
                        Back to Products
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
