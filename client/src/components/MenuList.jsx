import { useState, useEffect } from "react"
import AddToCart from "./AddToCart";
const URL = `http://localhost:8070/api`
function MenuList() {
const [items, setItems] = useState([]);
const getMenuItems = async () =>{
 try {
  const response = await fetch(`${URL}/menu`)
  const result = await response.json()
  setItems(result.data)
  // console.log(result.data);
 } catch (error) {
  console.error(error)
 }
}
useEffect(() => {
  getMenuItems()
}, [])

  return (
    <>
    <div className="menu-box">
    <div className="menu-title">
      <h1>Our Menu</h1>
    </div>
    <div className="categories">
      <span className="category" >
        Appetizers
      </span>
      <span className="category">
        Mains
      </span>
      <span className="category">
        Drinks
      </span>
      <span className="category">
        Desserts
      </span>
    </div>
    <ul className="menu" id="foodMenu">
    {items.map(item => (
      <li className="menu-item" key={item.id}>
      <span className="item-image">
        <img
          className="item-img"
          src={item.photo_url}
          alt="menu item image"
        />
      </span>
      <span className="item-name-description">
        <p className="item-name">{item.name} </p>
        <p className="item-description">{item.description} </p>
      </span>
      <span className="item-cost">${item.cost}</span>
      <AddToCart item={item}/>
    </li>
     ))}
     </ul>
  </div>
  </>
  )
}

export default MenuList
export {URL}
