import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Title {
  id: number;
  name: string;
}

interface FrequentTitlesProps {
  onSelect: (title: string) => void;
  addToShoppingList: (title: string) => void;
  shoppingItems: string[]; // Shopping list items for highlighting
}

const FrequentTitles: React.FC<FrequentTitlesProps> = ({ onSelect, addToShoppingList, shoppingItems }) => {
  const [titles, setTitles] = useState<Title[]>(() => {
    const storedTitles = localStorage.getItem("frequentTitles");
    return storedTitles
      ? JSON.parse(storedTitles)
      : [
        { id: 1, name: "Milk" },
        { id: 2, name: "Mixture" },
        { id: 3, name: "Bread" },
        { id: 4, name: "Coconut" },
        { id: 5, name: "Jalebi" },
      ];
  });

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("frequentTitles", JSON.stringify(titles));
  }, [titles]);

  const addTitle = () => {
    if (!newTitle.trim() || titles.some((title) => title.name.toLowerCase() === newTitle.toLowerCase())) return;
    const newEntry: Title = { id: Date.now(), name: newTitle };
    setTitles([...titles, newEntry]);
    setNewTitle("");
  };

  const removeTitle = (id: number) => {
    setTitles(titles.filter((title) => title.id !== id));
  };

  const handleSelect = (name: string) => {
    onSelect(name);
    addToShoppingList(name); // Add the selected title to the shopping list
  };

  return (
    <div className="mb-4 p-3 bg-gray-100 rounded-lg">
      <h3 className="font-semibold mb-2 text-gray-700">Frequent Titles</h3>
      <div className="flex gap-2 flex-wrap mb-2">
        {titles.map(({ id, name }) => {
          const isInShoppingList = shoppingItems.includes(name);
          return (
            <div
              key={id}
              onClick={() => handleSelect(name)}
              className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer transition ${isInShoppingList ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                }`}
            >
              {name}
              <button onClick={(e) => { e.stopPropagation(); removeTitle(id); }} className="ml-2 text-red-200 hover:text-red-400">
                ✕
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Add new title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTitle()}
        />
        <Button onClick={addTitle} className="bg-green-500 hover:bg-green-600 text-white">
          Add
        </Button>
      </div>
    </div>
  );
};

export default FrequentTitles;
