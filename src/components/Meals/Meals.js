import MealsSummary from "./MealsSummary"
import AvailableMeals from "./AvailableMeals"
import { Fragment } from "react"

// This component acts as a "wrapper" for the MealsSummary and AvailableMeals
const Meals = () => {
  return <Fragment>
    <MealsSummary/>
    <AvailableMeals/>
  </Fragment>
}

export default Meals