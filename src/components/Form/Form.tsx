import { useContext, useState, type ChangeEvent, type SubmitEvent } from "react";
import "./Form.css";
import { ShoppingListContext } from "../../app/ShoppingListContext";

interface FormProps {
  addNewItem: (newItem: string) => void;
}

interface Feedback {
  type: "error" | "success";
  msg: string;
}

function Form({ addNewItem }: FormProps) {
  const [item, setItem] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

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
      setFeedback({ type: "error", msg: "Nothing to add" });
    } else if (items.indexOf(newItem) > -1) {
      setFeedback({ type: "error", msg: "Item already added" });
    } else {
      addNewItem(newItem);
      setFeedback({ type: "success", msg: "Item added" });
      setItem("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <label htmlFor="new-item-input">Add an item:</label>
        <input
          type="text"
          name="new-item"
          id="new-item-input"
          value={item}
          onChange={handleInputChange}
        />
        <button type="submit" name="add" aria-label="add" title="Add" disabled={item.trim() === ""}>
          +
        </button>
      </form>
      {/* Should have this vanish after a period */}
      {feedback && <p className={`msg msg--${feedback.type}`}>{feedback.msg}</p>}
    </>
  );
}

export default Form;
