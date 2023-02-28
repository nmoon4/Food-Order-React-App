import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

// This component is where the user inputs the quantity of a food they want
const MealItemForm = (props) => {
  // keeps track of whether or not the inputted quantity is valid (i.e. between 1 and 5)
  const [amountIsValid, setAmountIsValid] = useState(true);

  // stores a value that does not cause a re-render when the value is updated
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    // prevents default of refreshing after submitting
    event.preventDefault();

    // amountInputRef is a pointer to the input field that takes the quantity of a food item.
    // It allows us to access the value that was typed into input field
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; // converts string to number

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber)
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
