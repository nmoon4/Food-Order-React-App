// useReducer is better than useState when keeping track of a complicated object with several variables
import { useReducer } from "react";

// As the number of components increases, it becomes more difficult to pass information through
// the prop of each component.
// Context is used in order to avoid having to constantly pass information through props.
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// The action parameter is the object that was passed into dispatchCartAction().
// This function returns the items in the cart and the total amount. It also
// contains the code for adding or removing an item.
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // Finds the item that was clicked on using the id provided by the action parameter
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // This if statement checks whether the food item is already in the cart.
    // It checks that exisitingCartItem is not null. It would be null if exisitingCartItemIndex is -1
    if (existingCartItem) {
      // The ... copies the exisitingCartItem object, and then the next line updates amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      // This line makes a copy of state.items in order to avoid directly changing state.items.
      // It is bad to update state directly because the component won't re-render.
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    // Finds the item that was clicked on using the id provided by the action parameter
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      // filters out the item that should be removed
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1}
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState;
};

// This is the implementation of CartContext.
// It defines what to do when the user tries to add or remove an item from the cart.
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    // dispatchCartAction() was one of the outputs from useReducer() in the lines above.
    // It is a function is used to update cartState.
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
