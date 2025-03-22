import ExpenseItem from "@/components/ExpenseItem";
import { getFormattedDate } from "@/lib/dateUtils";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onUpdateExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onUpdateExpense, onDeleteExpense }) => {
  const currentDate = getFormattedDate();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 p-3">Expenses for {currentDate}</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses added yet.</p>
      ) : (
        <ul className="mt-4 bg-white p-2 rounded-lg shadow">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onUpdateExpense={onUpdateExpense}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
