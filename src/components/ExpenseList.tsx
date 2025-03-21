import { Card, CardContent } from "@/components/ui/card";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.quantity * expense.rate, 0);

  return (
    <div>
      <Card className="mt-4 p-4 bg-gray-50 shadow-md rounded-lg">
        <CardContent>
          <h3 className="font-semibold text-lg text-gray-800">Total: ₹{totalAmount.toFixed(2)}</h3>
        </CardContent>
      </Card>

      <ul className="mt-4 bg-white p-2 rounded-lg shadow">
        {expenses.map((expense) => (
          <li key={expense.id} className="border-b last:border-0 py-2 flex justify-between text-gray-700">
            <span>{expense.title} ({expense.quantity} x ₹{expense.rate.toFixed(2)})</span>
            <span className="font-semibold">₹{(expense.quantity * expense.rate).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
