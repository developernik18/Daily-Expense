import ExpenseItem from "@/components/ExpenseItem";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

interface ExpenseHistoryListProps {
  selectedDate: string;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}

const ExpenseHistoryList: React.FC<ExpenseHistoryListProps> = ({ selectedDate, expenses, setExpenses }) => {
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
  );
};

export default ExpenseHistoryList;
