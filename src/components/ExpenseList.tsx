import ExpenseItem from "@/components/ExpenseItem";

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
  return (
    <ul className="mt-4 bg-white p-2 rounded-lg shadow">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onUpdateExpense={onUpdateExpense} onDeleteExpense={onDeleteExpense} />
      ))}
    </ul>
  );
};

export default ExpenseList;
