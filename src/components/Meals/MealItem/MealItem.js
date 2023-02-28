import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css'
import CartContext from '../../../store/cart-context';

// This component is for each individual meal item (i.e. burger, sushi, etc.).
// Each meal item has a name and a price.
const MealItem = (props) => {
  const cartCtx = useContext(CartContext)

  // Adds a dollar sign in front of the price and makes sure to always show 2 decimals places
  const price = `$${props.price.toFixed(2)}` 

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
