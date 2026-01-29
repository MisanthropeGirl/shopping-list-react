import { useContext } from "react";
import type { Feedback } from "../../typings";
import { ShoppingListContext } from "../../app/ShoppingListContext";

interface ListProps {
  crossOffItem: (bought: string) => void;
  removeUnwantedItem: (unwanted: string) => void;
  setFeedback: (feedback: Feedback | null) => void;
}

function List({ removeUnwantedItem, setFeedback, crossOffItem }: ListProps) {
  const items = useContext(ShoppingListContext);

  const removeItem = (name: string) => {
    removeUnwantedItem(name);
    setFeedback({ msg: "Item removed" });
  };

  if (items.length === 0) {
    return <p>Your shopping list is currently empty.</p>;
  }

  return (
    <ul>
      {items.map(item => {
        const name = item.name;
        const displayName = item.crossedOff ? <s>{item.name}</s> : item.name;

        return (
          <li key={name.toLowerCase().replace(" ", "-")}>
            <div className="item">
              <span className="item__name">{displayName}</span>
              <div className="item__btns">
                {!item.crossedOff && (
                  <button
                    type="button"
                    name="cross-off"
                    aria-label={`cross off ${name}`}
                    title="Cross off"
                    className="btn--cross-off"
                    onClick={() => crossOffItem(name)}
                  >
                    &#10003;
                  </button>
                )}
                <button
                  type="button"
                  name="remove"
                  aria-label={`remove ${name}`}
                  title="Remove"
                  className="btn--remove"
                  onClick={() => removeItem(name)}
                >
                  &times;
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
