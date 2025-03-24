import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Title {
  id: number;
  name: string;
}

interface FrequentTitlesProps {
  onAddExpense: (title: string, quantity: number, rate: number, paidPrice: number, unit: string) => void;
}

const FrequentTitles: React.FC<FrequentTitlesProps> = ({ onAddExpense }) => {
  const [titles, setTitles] = useState<Title[]>(() => {
    const storedTitles = localStorage.getItem("frequentTitles");
    return storedTitles ? JSON.parse(storedTitles) : [
      { id: 1, name: "Milk" },
      { id: 2, name: "Mixture" },
      { id: 3, name: "Bread" },
      { id: 4, name: "Coconut" },
      { id: 5, name: "Jalebi" }
    ];
  });

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("frequentTitles", JSON.stringify(titles));
  }, [titles]);

  // Add a new frequent title
  const addTitle = () => {
    if (!newTitle.trim() || titles.some(title => title.name === newTitle)) return;
    const newEntry: Title = { id: Date.now(), name: newTitle };
    setTitles([...titles, newEntry]);
    setNewTitle("");
  };

  // Remove a title
  const removeTitle = (id: number) => {
    setTitles(titles.filter(title => title.id !== id));
  };

  // Handle double-click to add expense with default values
  const handleDoubleClick = (title: string) => {
    onAddExpense(title, 1, 0, 0, "Kg");
  };

  // Handle Enter key for adding title
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTitle();
    }
  };

  return (
    <div className="mb-4 p-3 bg-gray-100 rounded-lg">
      <h3 className="font-semibold mb-2 text-gray-700">Frequent Titles</h3>
      <div className="flex gap-2 flex-wrap mb-2">
        {titles.map(({ id, name }) => (
          <div
            key={id}
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-blue-600 transition"
            onDoubleClick={() => handleDoubleClick(name)}
          >
            <span>{name}</span>
            <button onClick={() => removeTitle(id)} className="ml-2 text-red-200 hover:text-red-400">✕</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Add new title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={addTitle} className="bg-green-500 hover:bg-green-600 text-white">Add</Button>
      </div>
    </div>
  );
};

export default FrequentTitles;
