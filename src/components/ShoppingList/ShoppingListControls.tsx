import { ShoppingItem } from "@/types";
import { Button } from "@/components/ui/button";

interface ShoppingListControlsProps {
  item: ShoppingItem;
  onDelete: (id: number) => void;
  onMoveToExpenses: (item: ShoppingItem) => void;
}

const ShoppingListControls: React.FC<ShoppingListControlsProps> = ({ item, onDelete, onMoveToExpenses }) => {
  return (
    <div className="flex gap-2">
      <Button onClick={() => onMoveToExpenses(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm">
        Move to Expenses
      </Button>
      <Button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm">
        Delete
      </Button>
    </div>
  );
};

export default ShoppingListControls;
