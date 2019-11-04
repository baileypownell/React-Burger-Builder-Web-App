import React from 'react';
import './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'


const Burger = (props) => {
  console.log(Object.keys(props.ingredients)); // salad, bacon, cheese, meat
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => { // just giving key and type
      //console.log(igKey); //salad, cheese, meat; i is current index in the array
      //console.log(igKey+i); // salad0, cheese0, cheese1 etc
      return <BurgerIngredients key={igKey + i} type={igKey} />;
    }
  ) // for each element, take the element and concat to an array that is empty at first
  }).reduce((arr, el) => {
        return arr.concat(el)
      }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  };
  return(
    <div className="Burger">
      <BurgerIngredients type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom"/>
    </div>
  );
}

export default Burger;
