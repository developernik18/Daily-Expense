import { useEffect, useState } from "react";
import FrequentTitles from "@/components/FrequentTitles";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseHistory from "@/components/ExpenseHistory";
import ShoppingList from "@/components/ShoppingList";
import { ShoppingItem } from "@/types";
import { Button } from "@/components/ui/button";
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
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false); // Toggle state
  const [title, setTitle] = useState("");
  const currentDate = getFormattedDate();

  // Toggle expense form visibility
  const toggleExpenseForm = () => setShowExpenseForm((prev) => !prev);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const storedExpenses = localStorage.getItem(`expenses-${currentDate}`);
    if (storedExpenses) {
      try {
        setExpenses(JSON.parse(storedExpenses));
      } catch (error) {
        console.error("Error parsing stored expenses:", error);
      }
    }
  }, [currentDate]);

  // Save expenses to localStorage when updated
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(expenses));
    }
  }, [expenses, currentDate]);

  // Load shopping list from localStorage on mount
  useEffect(() => {
    const storedShoppingList = localStorage.getItem("shoppingList");
    if (storedShoppingList) {
      try {
        setShoppingItems(JSON.parse(storedShoppingList));
      } catch (error) {
        console.error("Error parsing stored shopping list:", error);
      }
    }
  }, []);

  // Save shopping list to localStorage when updated
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  // Add an item to the shopping list
  const addToShoppingList = (title: string) => {
    if (!title || shoppingItems.some((item) => item.title === title)) return;
    setShoppingItems((prev) => [...prev, { id: Date.now(), title, quantity: 1, rate: 0, unit: "Piece", paidPrice: 0 }]);
  };

  // Update an item in the shopping list
  const updateShoppingItem = (updatedItem: ShoppingItem) => {
    setShoppingItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  // Remove an item from the shopping list
  const deleteShoppingItem = (id: number) => {
    setShoppingItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Move a shopping item to expenses when a price is entered
  const moveShoppingItemToExpenses = (item: ShoppingItem) => {
    const newExpense: Expense = {
      id: Date.now(),
      title: item.title,
      quantity: item.quantity,
      rate: 0, // User should edit later
      paidPrice: item.paidPrice,
      unit: item.unit,
    };

    setExpenses((prev) => {
      const updatedExpenses = [...prev, newExpense];
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });

    deleteShoppingItem(item.id);
  };

  // Add a new expense directly
  const addExpense = (title: string, quantity: number, rate: number, paidPrice: number, unit: string) => {
    if (!title) return;
    const newExpense = { id: Date.now(), title, quantity, rate, paidPrice, unit };

    setExpenses((prev) => {
      const updatedExpenses = [...prev, newExpense];
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });

    setTitle("");
  };

  // Update an existing expense
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp));
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

  // Delete an expense
  const deleteExpense = (id: number) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.filter((exp) => exp.id !== id);
      localStorage.setItem(`expenses-${currentDate}`, JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Expense Tracker</h2>

      {/* Shopping List */}
      <ShoppingList
        shoppingItems={shoppingItems}
        onMoveToExpenses={moveShoppingItemToExpenses}
        onUpdateShoppingItem={updateShoppingItem}
        onDeleteShoppingItem={deleteShoppingItem}
      />

      {/* Frequent Titles - Highlights items in the shopping list */}
      <FrequentTitles
        onSelect={setTitle}
        addToShoppingList={addToShoppingList}
        shoppingItems={shoppingItems.map(item => item.title)}
      />

      {/* Expense Summary */}
      <ExpenseSummary expenses={expenses} />

      {/* Expense List */}
      <ExpenseList expenses={expenses} onUpdateExpense={updateExpense} onDeleteExpense={deleteExpense} />


      {/* Expense History */}
      <ExpenseHistory />


      <div className="p-6">
        {/* Toggle Expense Form */}
        <div className="flex justify-center mb-4">
          <Button onClick={toggleExpenseForm} className="bg-blue-500 text-white px-4 py-2 rounded">
            {showExpenseForm ? "Hide Expense Form" : "Want to add more Expenses?"}
          </Button>
        </div>

        {/* Expense Form (Only Show When Needed) */}
        {showExpenseForm && <ExpenseForm title={title} setTitle={setTitle} onAddExpense={addExpense} />}
      </div>
    </div>
  );
}
