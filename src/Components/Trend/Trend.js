import React, { useEffect, useState, useRef } from 'react';
import './Trend.css';
import { getCompararTendencias } from '../../services/apiTrendsService';

const Trend = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [nearProducts, setNearProducts] = useState([]);
  const [temporadaProducts, setTemporadaProducts] = useState([]);
  const [currentTemporadaIndex, setCurrentTemporadaIndex] = useState(0);
  const trendingProductsRef = useRef(null);
  const temporadaProductsRef = useRef(null);
  const slideIntervalRef = useRef(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const data = await getCompararTendencias(1); // Obtener productos con category_id=1
        setTrendingProducts(data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    const fetchNearProducts = async () => {
      try {
        const data = await getCompararTendencias(3); // Obtener productos con category_id=3
        setNearProducts(data);
      } catch (error) {
        console.error('Error fetching near products:', error);
      }
    };

    const fetchTemporadaProducts = async () => {
      try {
        const data = await getCompararTendencias(2); // Obtener productos con category_id=2
        setTemporadaProducts(data);
      } catch (error) {
        console.error('Error fetching temporada products:', error);
      }
    };

    fetchTrendingProducts();
    fetchNearProducts();
    fetchTemporadaProducts();
  }, []);

  useEffect(() => {
    startSlideShow();
    return () => stopSlideShow(); // Clean up on component unmountt
  }, [temporadaProducts]);

  const startSlideShow = () => {
    stopSlideShow(); // Ensure no existing interval is running
    slideIntervalRef.current = setInterval(() => {
      setCurrentTemporadaIndex((prevIndex) => (prevIndex + 1) % temporadaProducts.length);
    }, 2000); // Change every 3 seconds
  };

  const stopSlideShow = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
  };

  const handleMouseEnter = () => {
    stopSlideShow();
  };

  const handleMouseLeave = () => {
    startSlideShow();
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="dashboard">
      <section className="header">
        <div className="header-content">
          <h1>Ola de calor</h1>
          <p>Preparate para este verano, tus clientes necesitarán...</p>
          <div className="header-buttons">
            <button className="start-shopping">¿No sabes que vender?</button>
          </div>
        </div>
        {temporadaProducts.length > 0 && (
          <div
            className="products-grid"
            ref={temporadaProductsRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="product-card1" key={temporadaProducts[currentTemporadaIndex].id}>
              <img src={temporadaProducts[currentTemporadaIndex].image_url} alt={temporadaProducts[currentTemporadaIndex].description} />
              <p className="product-price">${temporadaProducts[currentTemporadaIndex].price}</p>
              <p className="product-brand">{temporadaProducts[currentTemporadaIndex].brand}</p>
              <h3>{temporadaProducts[currentTemporadaIndex].description}</h3>
            </div>
          </div>
        )}
      </section>
      <section className="trending-products">
        <h2>Productos en tendencia</h2>
        <button className="scroll-button left" onClick={() => scrollLeft(trendingProductsRef)}>👈</button>
        <div className="products-grid" ref={trendingProductsRef}>
          {trendingProducts.map((product) => (
            <div className="product-card3" key={product.id}>
              <img src={product.image_url} alt={product.description} />
              <p className="product-price">${product.price}</p>
              <p className="product-brand">{product.brand}</p>
              <h3>{product.description}</h3>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scrollRight(trendingProductsRef)}>👉</button>
      </section>
      <section className="near-products">
  <h2>Artículos populares cerca de ti!</h2>
  <div className="products-grid1">
    {nearProducts.map((product) => (
      <div className="product-card4" key={product.id}>
        <img src={product.image_url} alt={product.description} />
        <div className="product-card4-content">
          <h3>{product.description}</h3>
          <p className="product-brand">{product.brand}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};



export default Trend;
