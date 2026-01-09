import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [productos, setProductos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://backend-reino-production.up.railway.app/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParam = searchParams.get("q") || "";
    setQuery(queryParam);
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      const filtered = productos.filter((product) =>
        product.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(productos);
    }
  }, [query, productos]);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='featured-products-section'>
      <h2>Resultados de la búsqueda</h2>
      {filteredData.length === 0 ? (
        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            No hay resultados para la búsqueda <strong>{query}</strong>.
          </p>
        </div>
      ) : (
        <>
          <div className='products-grid'>
            {filteredData.slice(0, visibleProducts).map((data) => (
              <div key={data._id} className='product-card'>
                <a href={`/detail/${data._id}`}>
                  <img src={data.imagen[0]} alt={data.nombre} className='product-image' />
                  <div className='product-info'>
                    <p className='product-title'>{data.nombre}</p>
                    <p className='product-price'>{data.marca}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          {visibleProducts < filteredData.length && (
            <button onClick={handleLoadMore} className='load-more-button'>
              Ver más
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
