import { useState, useEffect } from "react";
import { getFormattedDate } from "@/lib/dateUtils";
import ExpenseItem from "@/components/ExpenseItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Fetch all saved expense dates from localStorage
  useEffect(() => {
    const expenseKeys = Object.keys(localStorage).filter((key) => key.startsWith("expenses-"));
    const formattedDates = expenseKeys.map((key) => key.replace("expenses-", ""));
    setDates(formattedDates);
  }, []);

  // Load expenses when the selected date changes
  useEffect(() => {
    const storedExpenses = localStorage.getItem(`expenses-${selectedDate}`);
    setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
  }, [selectedDate]);

  // Update LocalStorage after modifying expenses
  const updateLocalStorage = (updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses-${selectedDate}`, JSON.stringify(updatedExpenses));
  };

  // Edit an existing expense
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
      <Card>
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

          {/* Expense List for Selected Date */}
          <div className="mt-4">
            {expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No expenses recorded for this date.</p>
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
    </div>
  );
};

export default ExpenseHistory;
