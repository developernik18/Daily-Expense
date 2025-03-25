import { useState } from "react";
import ShoppingListControls from "./ShoppingListControls";
import ShoppingListEditForm from "./ShoppingListEditForm";
import { ShoppingItem } from "@/types";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onUpdate: (item: ShoppingItem) => void;
  onDelete: (id: number) => void;
  onMoveToExpenses: (item: ShoppingItem) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, onUpdate, onDelete, onMoveToExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="bg-white p-3 rounded-md shadow mb-2">
      {isEditing ? (
        <ShoppingListEditForm item={item} onUpdate={onUpdate} onClose={() => setIsEditing(false)} />
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity} {item.unit} | ₹{item.paidPrice}
              {item.rate ? ` | Rate: ₹${item.rate} per ${item.unit}` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">Edit</button>
            <ShoppingListControls item={item} onUpdate={onUpdate} onDelete={onDelete} onMoveToExpenses={onMoveToExpenses} />
          </div>
        </div>
      )}
    </li>
  );
};

export default ShoppingListItem;
