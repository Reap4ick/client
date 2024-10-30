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
        <div className='max-w-2xl mx-auto p-6'>
            <h2 className='text-4xl font-bold mb-5 text-center'>{product.name}</h2>
            <Carousel arrows infinite={false} className="mb-5">
                {product.images.map((image, i) => (
                    <div key={i}>
                        <img src={`${API_URL}/images/1200_${image}`} alt={product.name} className='w-full h-96 object-cover' />
                    </div>
                ))}
            </Carousel>
            <p className='text-2xl font-semibold text-teal-800 mb-4'>Price: {product.price}$</p>
            <div className='flex justify-center mt-6'>
                <Link to="/products">   
                    <Button type="primary">Back to Products</Button>
                </Link>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
