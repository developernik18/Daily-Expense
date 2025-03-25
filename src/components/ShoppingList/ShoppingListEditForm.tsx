import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ShoppingItem } from "@/types";

interface ShoppingListEditFormProps {
  item: ShoppingItem;
  onUpdate: (updatedItem: ShoppingItem) => void;
  onClose: () => void;
  onMoveToExpense?: (updatedItem: ShoppingItem) => void;
}

const units = ["Gram", "Kg", "Liter", "Packet", "Piece", "Dozen"];

const ShoppingListEditForm: React.FC<ShoppingListEditFormProps> = ({ item, onUpdate, onClose, onMoveToExpense }) => {
  const [title, setTitle] = useState(item.title);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [unit, setUnit] = useState(item.unit);
  const [rate, setRate] = useState(item.rate?.toString() || ""); // Ensure rate is pre-filled
  const [paidPrice, setPaidPrice] = useState(item.paidPrice?.toString() || "");

  // Auto-calculate paid price when quantity or rate changes
  useEffect(() => {
    if (quantity && rate) {
      const calculatedPrice = parseFloat(quantity) * parseFloat(rate);
      setPaidPrice(calculatedPrice.toFixed(2)); // Ensure correct decimal format
    }
  }, [quantity, rate]);

  const handleSave = () => {
    const updatedItem = {
      ...item,
      title,
      quantity: parseFloat(quantity),
      unit,
      rate: rate ? parseFloat(rate) : 0,
      paidPrice: parseFloat(paidPrice),
    };
    onUpdate(updatedItem);
    onClose();
  };

  const handleMoveToExpense = () => {
    if (onMoveToExpense) {
      const updatedItem = {
        ...item,
        title,
        quantity: parseFloat(quantity),
        unit,
        rate: rate ? parseFloat(rate) : 0,
        paidPrice: parseFloat(paidPrice),
      };
      onMoveToExpense(updatedItem); // Move to expense list
      onClose();
    }
  };

  return (
    <div className="p-3 bg-gray-100 rounded-lg">
      {/* Title Input */}
      <Input
        className="mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="E.g., Milk, Bread, Eggs"
      />

      {/* Quantity & Unit Selector */}
      <div className="flex gap-2">
        <Input
          className="flex-1"
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity (e.g., 1, 2, 500)"
        />
        <Select onValueChange={setUnit} value={unit}>
          <SelectTrigger className="flex-1 bg-white p-2 border rounded-md">
            <SelectValue>{unit}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rate Input */}
      <div className="relative mt-2">
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
        <Input
          className="pl-5"
          type="number"
          min="0"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter rate per unit (e.g., 50 for ₹50 per kg)"
        />
      </div>

      {/* Paid Price Input (Auto-calculated if rate & quantity are set) */}
      <div className="relative mt-2">
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
        <Input
          className="pl-5"
          type="number"
          min="0"
          value={paidPrice}
          onChange={(e) => setPaidPrice(e.target.value)}
          placeholder="Enter total paid price (auto-calculated if rate exists)"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3">
        <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
          Save
        </Button>
        {onMoveToExpense && (
          <Button onClick={handleMoveToExpense} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
            Move to Expense
          </Button>
        )}
        <Button onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ShoppingListEditForm;
