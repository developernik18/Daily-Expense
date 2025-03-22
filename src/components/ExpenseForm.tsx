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
    if (!title) return;

    const finalQuantity = quantity ? parseFloat(quantity) : 1;
    const finalRate = rate ? parseFloat(rate) : 0;
    const finalPaidPrice = paidPrice ? parseFloat(paidPrice) : 0;

    onAddExpense(title, finalQuantity, finalRate, finalPaidPrice, unit);

    setTitle("");
    setQuantity("");
    setRate("");
    setPaidPrice("");
    setUnit("Kg");
  };

  return (
    <div className="mb-4 p-4 bg-white shadow rounded-lg space-y-4">
      {/* Title Input */}
      <Input
        className="p-3 border rounded-md w-full"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Quantity & Unit Selector */}
      <div className="flex flex-wrap gap-4">
        <Input
          className="p-3 border rounded-md flex-1 min-w-[140px]"
          type="number"
          placeholder="Quantity"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Select onValueChange={setUnit} value={unit}>
          <SelectTrigger className="p-3 border rounded-md bg-white flex-1 min-w-[140px]">
            <SelectValue>{unit}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rate & Paid Price Inputs */}
      <div className="flex flex-col gap-4">
        {/* Rate Input */}
        <div className="relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
          <Input
            className="p-3 pl-5 border rounded-md w-full"
            type="number"
            placeholder="Rate"
            min="0"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
            per {unit}
          </span>
        </div>
        {/* Paid Price Input */}
        <div className="relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
          <Input
            className="p-3 pl-5 border rounded-md w-full"
            type="number"
            placeholder="Paid Price"
            min="0"
            value={paidPrice}
            onChange={(e) => setPaidPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Add Expense Button (Always Enabled) */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md"
      >
        Add Expense
      </Button>
    </div>
  );
};

export default ExpenseForm;
