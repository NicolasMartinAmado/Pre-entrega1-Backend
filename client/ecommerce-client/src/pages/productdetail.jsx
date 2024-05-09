import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductDetail from "../components/productdetail/productdetail"


const ProductDetailPages = () => {

    const [product, setProduct] = useState({})
    const { pid } = useParams()

    useEffect(() =>{
        const getProduct = async () => {
            const dataJson = await fetch(`http://localhost:8080/api/products/${pid}`)
            const data = await dataJson.json()
            console.log(data)
            setProduct(data.payload[0])
        }
        getProduct()
    }, [])

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default ProductDetailPages