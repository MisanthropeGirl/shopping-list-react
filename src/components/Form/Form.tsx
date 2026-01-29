import { useContext, useState, type ChangeEvent, type SubmitEvent } from "react";
import type { Feedback } from "../../typings";
import { ShoppingListContext } from "../../app/ShoppingListContext";

interface FormProps {
  addNewItem: (newItem: string) => void;
  setFeedback: (feedback: Feedback | null) => void;
}

function Form({ addNewItem, setFeedback }: FormProps) {
  const [item, setItem] = useState<string>("");
  const items = useContext(ShoppingListContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setItem(e.currentTarget.value);
    setFeedback(null);
  };

  const handleSubmission = (e: SubmitEvent) => {
    e.preventDefault();

    setFeedback(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const newItemRaw = formData.get("new-item") as string;
    const newItem = newItemRaw.trim();

    if (!newItem || newItem === "") {
      setFeedback({ msg: "Nothing to add", type: "error" });
    } else if (items.indexOf(newItem) > -1) {
      setFeedback({ msg: "Item already added", type: "error" });
    } else {
      addNewItem(newItem);
      setFeedback({ msg: "Item added" });
      setItem("");
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <label htmlFor="new-item-input">Add an item:</label>
      <input
        type="text"
        name="new-item"
        id="new-item-input"
        value={item}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        name="add"
        aria-label="add"
        title="Add"
        className="btn-add"
        disabled={item.trim() === ""}
      >
        +
      </button>
    </form>
  );
}

export default Form;
