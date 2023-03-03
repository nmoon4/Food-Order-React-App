import { useEffect, useState } from "react";

import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

// This component displays all of the available meals
const AvailableMeals = () => {
  const [meals, setMeals] = useState([])

  // If the fetchMeals() function is called without using useEffect(), it will create an infinite loop.
  // This is because fetchMeals() modifies the state, which causes the component to re-render and call
  // fetchMeals() again.

  // The 2nd parameter of useEffect() is a list of dependencies. When a dependency is changed, 
  // useEffect() will be called again. In this case, the dependencies are just an empty list
  // because useEffect() only needs to be called once when the component is rendered for the first time.
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-692b0-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals)
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
