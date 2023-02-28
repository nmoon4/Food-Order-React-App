import React from 'react'

// This is pretty much an interface that has info about what variables and methods the CartContext will have.
// The methods are actually implemented in CartProvider.js
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
})

export default CartContext