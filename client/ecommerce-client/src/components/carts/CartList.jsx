import React from 'react'
import CartListCard from './CartListCard'
import { Producto } from '../../data/product';

const CartList = ({oneMoreClick, oneLessClick, onXClick}) => {
  
  return (
    <div className="list-cards">
      {Producto.map(product => <CartListCard  key={product._id} product={product} oneMoreClick={oneMoreClick} oneLessClick={oneLessClick} onXClick={onXClick}/>)}
    </div>
  )
}

export default CartList