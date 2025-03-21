import { useState } from "react";
import FrequentTitles from "@/components/FrequentTitles";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState(""); // Track the title input

  const addExpense = (title: string, quantity: number, rate: number) => {
    setExpenses([...expenses, { id: Date.now(), title, quantity, rate }]);
    setTitle(""); // Reset title after adding an expense
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Expense Tracker</h2>
      <FrequentTitles onSelect={setTitle} />  {/* Pass setTitle to update title */}
      <ExpenseForm title={title} setTitle={setTitle} onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}
