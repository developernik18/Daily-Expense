import { useEffect, useState } from "react";
import FrequentTitles from "@/components/FrequentTitles";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseHistory from "@/components/ExpenseHistory";

import { getFormattedDate } from "@/lib/dateUtils";

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
  const [title, setTitle] = useState(""); // Track title input
  const currentDate = getFormattedDate();
  const [showForm, setShowForm] = useState(false); // ✅ State to control form visibility

  // Load expenses from localStorage on mount
  useEffect(() => {
    const storedExpenses = localStorage.getItem(`expenses-${currentDate}`);
    if (storedExpenses) {
      try {
        setExpenses(JSON.parse(storedExpenses));
      } catch (error) {
        console.error("Error parsing stored expenses:", error);
        setExpenses([]);
      }
    } else {
      setExpenses([]);
    }
  }, [currentDate]);

  // Save expenses to localStorage whenever they update
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(expenses));
    }
  }, [expenses, currentDate]);

  const addExpense = (title: string, quantity: number, rate: number, paidPrice: number, unit: string) => {
    if (!title) return;
    const newExpense = { id: Date.now(), title, quantity, rate, paidPrice, unit };

    setExpenses((prev) => {
      const updatedExpenses = [...prev, newExpense];
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses)); // Ensure immediate update
      return updatedExpenses;
    });

    setTitle(""); // Reset title
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp));
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses)); // Ensure immediate update
      return updatedExpenses;
    });
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.filter((exp) => exp.id !== id);
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses)); // Ensure immediate update
      return updatedExpenses;
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Expense Tracker</h2>
        <FrequentTitles onAddExpense={addExpense} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseList expenses={expenses} onUpdateExpense={updateExpense} onDeleteExpense={deleteExpense} />
      </div>
      <div className="max-w-4xl mx-auto p-6">

        {/* Toggle Expense Form Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mb-4 p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
        >
          {showForm ? "Close Expense Form" : "Show Expense Form"}
        </button>

        {/* Expense Form (Only shown when showForm is true) */}
        {showForm && (
          <ExpenseForm title={title} setTitle={setTitle} onAddExpense={addExpense} />
        )}
      </div>
      <ExpenseHistory />

    </>

  );
}
