import ProductsList from "./productList"

const ProductsListContainer = ({products}) => {
    return (
        <div>
            {products.map(product => <ProductsList key={product._id} product={product} />)}
        </div>
    )
}

export default ProductsListContainer