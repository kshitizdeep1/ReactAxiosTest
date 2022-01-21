import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://omnicell-test.herokuapp.com/";
let newRecepi = {};
function CreateRecipe({ sendRecipe, recipeId }) {
  const [recepi, setRecepi] = useState({
    category: "",
    description: "",
    image: "",
    label: "",
    name: "",
    price: "",
  });
  const [clicked, setClicked] = useState(false);
  const [edit, setEdit] = useState(true);
  const handleClick = (e) => {
    setClicked(true);
    setEdit(false);
    setRecepi({
      category: sendRecipe.category,
      description: sendRecipe.description,
      image: sendRecipe.image,
      label: sendRecipe.label,
      name: sendRecipe.name,
      price: sendRecipe.price,
    });
  };
  const cancleEdit = (e) => {
    setClicked(false);
    setEdit(true);
    setRecepi({
      category: "",
      description: "",
      id: 0,
      image: "",
      label: "",
      name: "",
      price: "",
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(recepi);
    setRecepi({ ...recepi, [name]: value });
  };
  const updateRecipe = (e) => {
    axios
      .put(baseURL + "edit/" + recipeId, {
        id: recipeId,
        category: recepi.category,
        description: recepi.description,
        image: recepi.image,
        label: recepi.label,
        name: recepi.name,
        price: recepi.price,
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      });
  };
  const deleteData = (e) => {
    axios.delete(baseURL + "delete/" + recipeId);
    setRecepi({
      category: "",
      description: "",
      id: 0,
      image: "",
      label: "",
      name: "",
      price: "",
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, {
        category: recepi.category,
        description: recepi.description,
        image: recepi.image,
        label: recepi.label,
        name: recepi.name,
        price: recepi.price,
      })
      .then((response) => {
        console.log(response.status);
      });
    newRecepi = recepi;
    setRecepi({
      category: "",
      description: "",
      id: 0,
      image: "",
      label: "",
      name: "",
      price: "",
    });
  };
  return (
    <>
      {edit ? (
        <button onClick={handleClick}>Edit</button>
      ) : (
        <>
          <button onClick={cancleEdit}>Cancle</button>
          <button onClick={deleteData}>Delete</button>
        </>
      )}
      <form action="" onSubmit={handelSubmit}>
        <label>category</label>
        <input
          name="category"
          value={recepi.category}
          onChange={handleChange}
          type="text"
        />
        <br />
        <label>description</label>
        <input
          name="description"
          value={recepi.description}
          onChange={handleChange}
          type="text"
        />
        <br />
        <label>image</label>
        <input
          name="image"
          value={recepi.image}
          onChange={handleChange}
          type="text"
        />
        <br />
        <label>label</label>
        <input
          name="label"
          value={recepi.label}
          onChange={handleChange}
          type="text"
        />
        <br />
        <label>name</label>
        <input
          name="name"
          value={recepi.name}
          onChange={handleChange}
          type="text"
        />
        <br />
        <label>price</label>
        <input
          name="price"
          value={recepi.price}
          onChange={handleChange}
          type="text"
        />
        <br />
        {clicked ? (
          <button onClick={updateRecipe}>Update</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
      <div>{JSON.stringify(newRecepi)}</div>
    </>
  );
}

export default CreateRecipe;
