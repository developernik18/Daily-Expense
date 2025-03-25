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
    <li className="bg-white p-4 rounded-lg shadow mb-3">
      {isEditing ? (
        <ShoppingListEditForm item={item} onUpdate={onUpdate} onClose={() => setIsEditing(false)} />
      ) : (
        <div className="flex flex-wrap justify-between items-center gap-3">
          {/* Item Details */}
          <div className="flex-1 min-w-[150px]">
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Qty:</span> {item.quantity} {item.unit}
              {item.paidPrice > 0 && <> | ₹{item.paidPrice}</>}
              {item.rate ? ` | ₹${item.rate}/${item.unit}` : ""}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
            >
              ✏️ Edit
            </button>
            <ShoppingListControls item={item} onDelete={onDelete} onMoveToExpenses={onMoveToExpenses} />
          </div>
        </div>
      )}
    </li>
  );
};

export default ShoppingListItem;
