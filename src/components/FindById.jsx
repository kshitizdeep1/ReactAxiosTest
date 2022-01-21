import React, { useState } from "react";
import axios from "axios";
import CreateRecipe from "./CreateRecipe";

let id = 0;
const baseUrl = "http://omnicell-test.herokuapp.com/";
function FindById() {
  const [recepi, setRecepi] = React.useState({
    category: "",
    description: "",
    image: "",
    label: "",
    name: "",
    price: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    id = e.target[0].value;
    axios.get(baseUrl + id).then((response) => {
      setRecepi(response.data);
    });
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label id="id">id:</label>
        <input type="text" id="id" name="recepiId"></input>
        <input type="submit"></input>
      </form>
      <div>
        <div>
          <p>
            <label>Name: </label>
            {recepi.name == null ? "" : recepi.name}
          </p>
          <p>
            <label>Description: </label>
            {recepi.description}
          </p>
          <p>
            <label>Label: </label>
            {recepi.label}
          </p>
          <p>
            <label>Price: </label>
            {recepi.price}
          </p>
          <p>
            <img src={recepi.image}></img>
          </p>

          <p>
            <label>Category: </label>
            {recepi.category}
          </p>
        </div>
      </div>
      <CreateRecipe sendRecipe={recepi} recipeId={id} />
    </>
  );
}

export default FindById;
