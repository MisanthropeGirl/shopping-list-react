import { createContext } from "react";
import type { Item } from "../typings";

export const ShoppingListContext = createContext<Item[]>([]);
