import React from "react";

import classes from "./Input.module.css";

// React.forwardRef allows ref to be used in this function
// ref is essentially a pointer to <input/> and allows us to access that value that
// has been inputted into the input field
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
