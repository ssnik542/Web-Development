import { useState } from "react";
import Logo from "./component/Logo";
import Form from "./component/Form";
import PackingList from "./component/PackingList";
import Stats from "./component/Stats";

export type ItemsList = {
  description: string;
  quantity: number;
  packed: boolean;
  id: number;
}
export default function App() {
  const [items, setItems] = useState<Array<ItemsList>>([]);

  function handleAddItems(item: ItemsList) {
    setItems(prev => [...prev, item])
  }

  function handleDeleteItem(id: Number) {
    setItems((items: ItemsList[]) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: Number) {
    setItems((items: ItemsList[]) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}