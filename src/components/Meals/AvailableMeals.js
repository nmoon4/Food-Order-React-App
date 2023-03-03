import { useEffect, useState } from "react";

import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// This component displays all of the available meals
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

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

      // not sure if I need this line
      if (!response.ok) {
        throw new Error("something went wrong");
      }

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

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      console.log(error);
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

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
