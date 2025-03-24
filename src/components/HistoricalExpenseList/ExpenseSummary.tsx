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
  const totalPaid = expenses.reduce((sum, exp) => sum + exp.paidPrice, 0);
  const totalCalculated = expenses.reduce((sum, exp) => sum + exp.quantity * exp.rate, 0);

  return (
    <div className="flex justify-between p-3 mt-4 bg-gray-100 rounded-lg shadow">
      <p className="font-semibold">Total Paid: ₹{totalPaid.toFixed(2)}</p>
      <p className="font-semibold">Total Calculated: ₹{totalCalculated.toFixed(2)}</p>
    </div>
  );
};

export default ExpenseSummary;
