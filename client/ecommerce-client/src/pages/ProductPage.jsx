import { useEffect, useState } from "react"
import ProductsListContainer from "../components/productslist/ProductsListContainer"

const ProductPages = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)

    const fetchProducts = async () => {
        const [ product, setProduct ] = useState([]);
      try {
        const resp = await fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        if (resp?.isError === false) {
          setProduct(resp.payload);
        } else {
          message(resp.message || "Error al obtener productos","error")
        }
      } catch (error) {
        message("Error al obtener productos debido a un problema en el sistema","error");
      }
    };

    useEffect(() => {
        fetchProducts(currentPage)
    }, [currentPage])
    
    const nextPage = () => {
        if (hasNextPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }
    
    const prevPage = () => {
        if (hasPrevPage) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    return (
        <div>
            <ProductsListContainer products={products} />
            <div className="text-center" style={{ marginTop: '20px' }}>
                {hasPrevPage && (
                    <button onClick={prevPage} className="btn btn-dark" style={{ marginRight: '10px' }}>
                        Prev
                    </button>
                )}
                <span className="page-number" style={{ marginRight: '10px' }}>{currentPage}</span>
                {hasNextPage && (
                    <button onClick={nextPage} className="btn btn-dark">
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductPages