import { BiSolidXSquare, BiPlusCircle, BiMinusCircle  } from "react-icons/bi";
import imagenes from "../../assets/img/imagenes";
import { Producto } from "../../data/product";

const CartListCard = ({ oneMoreClick, oneLessClick, onXClick}) => {
  const prod = Producto.find((item) => item.id == id);
  return (
    <div className="horizontal-card">
      <img className="card-img" src={prod.img} alt={prod.title} />
      <p className="card-title">{prod.title}</p>
      <p className="strong">$ {prod.precio.toLocaleString("es-ES", { style: "decimal" })} x unid.</p>
      <p className="">Cant: {prod.quantity}</p>
      <p className="strong">$ {(prod.precio*prod.quantity).toLocaleString("es-ES", { style: "decimal" })}</p>
      <button className="button-cart" onClick={() => oneMoreClick(product)}><BiPlusCircle /></button>
      <button className="button-cart" onClick={() => oneLessClick(product)}><BiMinusCircle /></button>
      <button className="button-cart" onClick={() => onXClick(product)}><BiSolidXSquare /></button>
    </div>
  )
}

export default CartListCard