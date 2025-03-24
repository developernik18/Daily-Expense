import { useState, useEffect } from "react";
import { getFormattedDate } from "@/lib/dateUtils";
import ExpenseItem from "@/components/ExpenseItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

const ExpenseHistory: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate());
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Toggle visibility

  // Load all saved dates from localStorage
  useEffect(() => {
    const storedDates = Object.keys(localStorage)
      .filter((key) => key.startsWith("expenses-"))
      .map((key) => key.replace("expenses-", ""));
    setDates(storedDates);
  }, []);

  // Load expenses for the selected date
  useEffect(() => {
    if (isOpen) {
      const storedExpenses = localStorage.getItem(`expenses-${selectedDate}`);
      setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
    }
  }, [selectedDate, isOpen]);

  // Calculate total paid and total calculated
  const totalPaid = expenses.reduce((sum, exp) => sum + exp.paidPrice, 0);
  const totalCalculated = expenses.reduce((sum, exp) => sum + exp.quantity * exp.rate, 0);

  // Update LocalStorage when modifying expenses
  const updateLocalStorage = (updatedExpenses: Expense[]) => {
    localStorage.setItem(`expenses-${selectedDate}`, JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  // Edit an expense
  const handleUpdateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    updateLocalStorage(updatedExpenses);
  };

  // Delete an expense
  const handleDeleteExpense = (id: number) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    updateLocalStorage(updatedExpenses);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Toggle Button */}
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Expense History" : "Show Expense History"}
      </Button>

      {/* Expense History Section */}
      {isOpen && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Expense History</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Date Selection Dropdown */}
            <select
              className="w-full p-2 border rounded-md text-gray-700"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dates.length === 0 ? (
                <option>No history found</option>
              ) : (
                dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))
              )}
            </select>

            {/* Expense Summary */}
            <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="text-lg font-semibold">Summary for {selectedDate}</p>
              <p className="text-gray-700">
                <strong>Total Paid:</strong> ₹{totalPaid.toFixed(2)}
              </p>
              <p className="text-gray-700">
                <strong>Total Calculated:</strong> ₹{totalCalculated.toFixed(2)}
              </p>
            </div>

            {/* Expense List */}
            <div className="mt-4">
              {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No expenses recorded for this date.
                </p>
              ) : (
                <ul className="divide-y divide-gray-200 bg-gray-50 p-3 rounded-lg shadow-md">
                  {expenses.map((expense) => (
                    <ExpenseItem
                      key={expense.id}
                      expense={expense}
                      onUpdateExpense={handleUpdateExpense}
                      onDeleteExpense={handleDeleteExpense}
                    />
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseHistory;
