import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Check, X } from "lucide-react"; // Icons for buttons

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
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleSave = () => {
    if (!editedExpense.title || editedExpense.quantity <= 0 || editedExpense.rate <= 0 || editedExpense.paidPrice < 0) {
      alert("Please enter valid values.");
      return;
    }
    onUpdateExpense(editedExpense);
    setIsEditing(false);
  };

  return (
    <li className="border-b last:border-0 py-4 px-2 flex justify-between items-center text-gray-700">
      {isEditing ? (
        <div className="grid gap-2 w-full">
          {/* Title Input */}
          <Input
            value={editedExpense.title}
            onChange={(e) => setEditedExpense({ ...editedExpense, title: e.target.value })}
            className="border rounded-md"
            placeholder="Item Name"
          />

          {/* Quantity, Rate, Paid Price, Unit */}
          <div className="grid grid-cols-4 gap-2">
            <Input
              type="number"
              value={editedExpense.quantity}
              onChange={(e) => setEditedExpense({ ...editedExpense, quantity: parseFloat(e.target.value) || 0 })}
              className="border rounded-md"
              placeholder="Qty"
            />
            <Select
              value={editedExpense.unit}
              onValueChange={(value) => setEditedExpense({ ...editedExpense, unit: value })}
            >
              <SelectTrigger className="border rounded-md">
                <SelectValue>{editedExpense.unit || "Select Unit"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                type="number"
                value={editedExpense.rate}
                onChange={(e) => setEditedExpense({ ...editedExpense, rate: parseFloat(e.target.value) || 0 })}
                className="pl-6 border rounded-md"
                placeholder="Rate"
              />
              <span className="text-xs text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2">{`per ${editedExpense.unit}`}</span>
            </div>

            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                type="number"
                value={editedExpense.paidPrice}
                onChange={(e) => setEditedExpense({ ...editedExpense, paidPrice: parseFloat(e.target.value) || 0 })}
                className="pl-6 border rounded-md"
                placeholder="Paid"
              />
            </div>
          </div>

          {/* Save & Cancel Buttons */}
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSave} className="bg-green-500 text-white flex items-center gap-1">
              <Check size={16} /> Save
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white flex items-center gap-1">
              <X size={16} /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        // Display Mode
        <div className="flex justify-between items-center w-full">
          <div>
            <span className="font-medium">{expense.title}</span>
            <span className="text-sm text-gray-500"> ({expense.quantity} {expense.unit} × ₹{expense.rate.toFixed(2)})</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-gray-600 text-sm">Calculated: ₹{(expense.quantity * expense.rate).toFixed(2)}</span>
            <span className="font-semibold text-blue-600">Paid: ₹{expense.paidPrice.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white flex items-center gap-1">
              <Pencil size={16} /> Edit
            </Button>
            <Button onClick={() => onDeleteExpense(expense.id)} className="bg-red-500 text-white flex items-center gap-1">
              <Trash2 size={16} /> Delete
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ExpenseItem;
