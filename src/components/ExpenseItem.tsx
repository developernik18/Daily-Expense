import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface Expense {
  id: number;
  title: string;
  quantity: number;
  rate: number;
  paidPrice: number;
  unit: string;
}

interface ExpenseItemProps {
  expense: Expense;
  onUpdateExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (id: number) => void;
}

const units = ["Gram", "Kg", "Liter", "Packet", "Piece", "Dozen"];

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onUpdateExpense, onDeleteExpense }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({ ...expense });

  const handleSave = () => {
    if (!editedExpense.title || editedExpense.quantity <= 0 || editedExpense.rate <= 0) {
      alert("Please enter valid values.");
      return;
    }
    onUpdateExpense(editedExpense);
    setIsEditing(false);
  };

  return (
    <li className="bg-white p-4 rounded-lg shadow-md mb-3 w-full mx-auto">
      {isEditing ? (
        <div className="space-y-3">
          {/* Title */}
          <Input
            value={editedExpense.title}
            onChange={(e) => setEditedExpense({ ...editedExpense, title: e.target.value })}
            placeholder="Expense Name"
            className="border rounded-md p-2"
          />

          {/* Quantity & Unit */}
          <div className="flex gap-2">
            <Input
              type="number"
              value={editedExpense.quantity}
              onChange={(e) => setEditedExpense({ ...editedExpense, quantity: parseFloat(e.target.value) || 0 })}
              placeholder="Quantity"
              className="border rounded-md p-2 flex-1"
            />
            <Select
              value={editedExpense.unit}
              onValueChange={(value) => setEditedExpense({ ...editedExpense, unit: value })}
            >
              <SelectTrigger className="border rounded-md p-2 flex-1">
                <SelectValue>{editedExpense.unit || "Unit"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rate, Calculated Amount & Editable Paid Amount */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                type="number"
                value={editedExpense.rate}
                onChange={(e) => setEditedExpense({ ...editedExpense, rate: parseFloat(e.target.value) || 0 })}
                placeholder="Rate"
                className="p-2 pl-6 border rounded-md"
              />
            </div>

            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                type="number"
                value={editedExpense.paidPrice}
                onChange={(e) => setEditedExpense({ ...editedExpense, paidPrice: parseFloat(e.target.value) || 0 })}
                placeholder="Paid Amount"
                className="p-2 pl-6 border rounded-md"
              />
            </div>
          </div>

          {/* Buttons - Right Aligned */}
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={handleSave} className="bg-green-500 text-white p-3 flex items-center gap-2">
              <Check size={18} /> Save
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white p-3 flex items-center gap-2">
              <X size={18} /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Expense Details */}
          <div className="flex-1 min-w-[140px]">
            <p className="font-medium text-lg">{expense.title}</p>
            <p className="text-sm text-gray-500">
              {expense.quantity} {expense.unit} × ₹{expense.rate.toFixed(2)}
            </p>
          </div>

          {/* Calculated Amount */}
          <div className="w-24 text-left sm:text-center">
            <p className="font-semibold text-gray-800 text-md">₹{(expense.quantity * expense.rate).toFixed(2)}</p>
            <p className="text-xs text-gray-500">Calculated</p>
          </div>

          {/* Paid Amount */}
          <div className="w-24 text-left sm:text-right">
            <p className="font-semibold text-blue-600 text-md">₹{expense.paidPrice.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Paid Amount</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-3 flex items-center gap-2">
              <Pencil size={18} /> Edit
            </Button>
            <Button onClick={() => onDeleteExpense(expense.id)} className="bg-red-500 text-white p-3 flex items-center gap-2">
              <Trash2 size={18} /> Delete
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ExpenseItem;
