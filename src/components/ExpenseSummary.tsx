import { Card, CardContent } from "@/components/ui/card";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalPaid = expenses.reduce((acc, expense) => acc + expense.paidPrice, 0);
  const totalCalculated = expenses.reduce((acc, expense) => acc + expense.quantity * expense.rate, 0);

  return (
    <Card className="mt-4 p-4 bg-gray-50 shadow-md rounded-lg">
      <CardContent>
        <h3 className="font-semibold text-lg text-gray-800">Total Paid: ₹{totalPaid.toFixed(2)}</h3>
        <p className="text-gray-600">Total Calculated: ₹{totalCalculated.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
