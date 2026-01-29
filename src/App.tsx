import { useState } from "react";
import { useImmer } from "use-immer";
import type { Feedback, Item } from "./typings";
import { ShoppingListContext } from "./app/ShoppingListContext";
import Message from "./components/Message/Message";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import "./App.css";

function App() {
  const [items, setItems] = useImmer<Item[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const addNewItem = (name: string) => {
    const newItem: Item = { name, crossedOff: false };
    setItems([...items, newItem]);
  };

  const removeUnwantedItem = (name: string) => {
    setItems(items.filter(it => it.name !== name));
    setFeedback({ msg: "Item removed" });
  };

  const crossOffItem = (name: string) => {
    const itemIndex = items.findIndex(it => it.name === name);
    setItems(draft => {
      draft[itemIndex].crossedOff = true;
    });
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
          <List
            crossOffItem={crossOffItem}
            removeUnwantedItem={removeUnwantedItem}
            setFeedback={setFeedback}
          />
        </ShoppingListContext>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
