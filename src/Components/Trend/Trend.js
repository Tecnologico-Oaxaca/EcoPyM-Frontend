import React, { useRef, useEffect, useState } from 'react';
import './Trend.css';
import { getCompararTendencias } from '../../services/apiTrendsService';

const imagePlaceholder = 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750036600500L.jpg?odnHeight=580&odnWidth=580&odnBg=FFFFFF';

// ProductCard Component
const ProductCard = ({ imageUrl, altText, discount, title, description }) => (
  <div className="product-card">
    <img src={"https://i.ibb.co/7yd6N6N/Capture-2024-05-28-084104.png"} alt={altText} className="product-card-img" />
    {discount && <div className="discount-badge">{discount}</div>}
    <h2 className="mt-4 text-lg font-semibold dark:text-white">{title}</h2>
    <p className="text-class">{description}</p>
  </div>
);


// Trend Component
const Trend = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollRef1 = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCompararTendencias();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="trend-container">
      <h2>Nuevos Productos</h2>
      <div className="scroll-container">
        <button onClick={() => scrollLeft(scrollRef1)} className="scroll-button">{"<"}</button>
        <div className="product-scroll" ref={scrollRef1}>
          <ProductList products={products} />
        </div>
        <button onClick={() => scrollRight(scrollRef1)} className="scroll-button">{">"}</button>
      </div>
    </div>
  );
};

// ProductList Component
const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product">
          <img src={product.image_url} alt={product.description} />
          <div className="product-info">
            <div className="product-name">{product.description}</div>
            {product.brand && <div className="product-brand">{product.brand}</div>}
            {product.price && <div className="product-price">{product.price}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// MainBanner Component
const MainBanner = () => {
  return (
    <div className="main-banner">
      <Trend />
    </div>
  );
};

// ProductGrid Component
const ProductGrid = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-4">
      <MainBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <ProductCard
          imageUrl="400x300"
          altText="Ola de calor"
          title="Ola de calor"
          description="Pepara a tus clientes para este verano"
        />
       
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        <ProductCard
          imageUrl="300x400"
          altText="Longines Masters"
          discount="-27%"
          title="Longines Masters"
          description="Experience the magic of Longines Masters"
        />
        <ProductCard
          imageUrl="300x400"
          altText="Headphones"
          discount="-6%"
          title="Headphones"
          description="High quality sound"
        />
        <ProductCard
          imageUrl="300x400"
          altText="Sofa"
          discount="-18%"
          title="Sofa"
          description="Comfortable and stylish"
        />
      </div>
    </div>
  );
};

// ProductPage Component
const ProductPage = () => {
  return <ProductGrid />;
};

export default ProductPage;
