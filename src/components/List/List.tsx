import { useContext } from "react";
import type { Feedback } from "../../typings";
import { ShoppingListContext } from "../../app/ShoppingListContext";

interface ListProps {
  removeUnwantedItem: (unwanted: string) => void;
  setFeedback: (feedback: Feedback | null) => void;
}

function List({ removeUnwantedItem, setFeedback }: ListProps) {
  const items = useContext(ShoppingListContext);

  const removeItem = (item: string) => {
    removeUnwantedItem(item);
    setFeedback({ msg: "Item removed" });
  };

  if (items.length === 0) {
    return <p>Your shopping list is currently empty.</p>;
  }

  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.toLowerCase().replace(" ", "-")}>
            <div className="item">
              <span className="item__name">{item}</span>
              <button
                type="button"
                name="remove"
                aria-label={`remove ${item}`}
                title="Remove"
                className="btn-remove"
                onClick={() => removeItem(item)}
              >
                &times;
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
