import { useState } from "react";
import type { Feedback } from "./typings";
import { ShoppingListContext } from "./app/ShoppingListContext";
import Message from "./components/Message/Message";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import "./App.css";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const addNewItem = (newItem: string) => {
    setItems([...items, newItem]);
  };

  const removeUnwantedItem = (unwanted: string) => {
    setItems(items.filter(it => it !== unwanted));
    setFeedback({ msg: "Item removed" });
  };

  return (
    <>
      <header>
        <h1>Shopping List</h1>
      </header>
      <main>
        <ShoppingListContext value={items}>
          <Form addNewItem={addNewItem} setFeedback={setFeedback} />
          <Message feedback={feedback} />
          <List removeUnwantedItem={removeUnwantedItem} setFeedback={setFeedback} />
        </ShoppingListContext>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
