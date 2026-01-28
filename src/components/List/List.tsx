import { useContext } from "react";
import { ShoppingListContext } from "../../app/ShoppingListContext";
import "./List.css";

function List() {
  const items = useContext(ShoppingListContext);

  if (items.length === 0) {
    return <p>Your shopping list is currently empty.</p>;
  }

  return (
    <ul>
      {items.map(item => {
        return <li key={item.toLowerCase().replace(" ", "-")}>{item}</li>;
      })}
    </ul>
  );
}

export default List;
