import { useState } from "react";
import { ShoppingListContext } from "./app/ShoppingListContext";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import "./App.css";

function App() {
  const [items, setItems] = useState<string[]>([]);

  const addNewItem = (newItem: string) => {
    setItems([...items, newItem]);
  };

  return (
    <>
      <header>
        <h1>Shopping List</h1>
      </header>
      <main>
        <ShoppingListContext value={items}>
          <Form addNewItem={addNewItem} />
          <List />
        </ShoppingListContext>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
