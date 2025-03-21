import { useState } from "react";
import FrequentTitles from "@/components/FrequentTitles";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState(""); // Track the title input

  const addExpense = (title: string, quantity: number, rate: number, paidPrice: number, unit: string) => {
    setExpenses([...expenses, { id: Date.now(), title, quantity, rate, paidPrice, unit }]);
    setTitle(""); // Reset title after adding an expense
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Expense Tracker</h2>
      <FrequentTitles onSelect={setTitle} />
      <ExpenseForm title={title} setTitle={setTitle} onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onUpdateExpense={updateExpense} onDeleteExpense={deleteExpense} />
      <ExpenseSummary expenses={expenses} />
    </div>
  );
}
