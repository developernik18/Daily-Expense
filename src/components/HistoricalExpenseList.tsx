import { useState, useEffect } from "react";
import { getFormattedDate } from "@/lib/dateUtils";
import ExpenseHistoryToggle from "@/components/HistoricalExpenseList/ExpenseHistoryToggle";
import ExpenseDateSelector from "@/components/HistoricalExpenseList/ExpenseDateSelector";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseHistoryList from "@/components/HistoricalExpenseList/ExpenseHistoryList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

const HistoricalExpenseList: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate());
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Fetch saved dates from localStorage
  useEffect(() => {
    const expenseKeys = Object.keys(localStorage).filter((key) => key.startsWith("expenses-"));
    const formattedDates = expenseKeys.map((key) => key.replace("expenses-", ""));
    setDates(formattedDates);
  }, []);

  // Load expenses for selected date
  useEffect(() => {
    const storedExpenses = localStorage.getItem(`expenses-${selectedDate}`);
    setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
  }, [selectedDate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Toggle Button */}
      <ExpenseHistoryToggle isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Expense History</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Date Selector */}
            <ExpenseDateSelector dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {/* Expense Summary */}
            <ExpenseSummary expenses={expenses} />

            {/* Expense List */}
            <ExpenseHistoryList selectedDate={selectedDate} expenses={expenses} setExpenses={setExpenses} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HistoricalExpenseList;
