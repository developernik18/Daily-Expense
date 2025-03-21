import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface ExpenseFormProps {
  title: string;
  setTitle: (title: string) => void;
  onAddExpense: (title: string, quantity: number, rate: number, paidPrice: number, unit: string) => void;
}

const units = ["Gram", "Kg", "Liter", "Packet", "Piece", "Dozen"];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ title, setTitle, onAddExpense }) => {
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [paidPrice, setPaidPrice] = useState("");
  const [unit, setUnit] = useState("Kg"); // Default unit

  const handleSubmit = () => {
    if (!title || !quantity || !rate || !paidPrice || !unit) return;
    onAddExpense(title, parseFloat(quantity), parseFloat(rate), parseFloat(paidPrice), unit);
    setQuantity("");
    setRate("");
    setPaidPrice("");
    setUnit("Kg");
  };

  return (
    <div className="mb-4">
      <Input className="p-2 border rounded-md mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className="flex gap-2 mb-2">
        <Input className="p-2 border rounded-md flex-1" type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <Select onValueChange={setUnit} value={unit}>
          <SelectTrigger className="p-2 border rounded-md bg-white flex-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Input className="p-2 border rounded-md mb-2" type="number" placeholder="Rate" value={rate} onChange={(e) => setRate(e.target.value)} />
      <Input className="p-2 border rounded-md mb-2" type="number" placeholder="Paid Price" value={paidPrice} onChange={(e) => setPaidPrice(e.target.value)} />

      <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">Add Expense</Button>
    </div>
  );
};

export default ExpenseForm;
