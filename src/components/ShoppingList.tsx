import ShoppingListItem from "./ShoppingList/ShoppingListItem";
import { ShoppingItem } from "@/types"; // Ensure this type is defined

interface ShoppingListProps {
  shoppingItems: ShoppingItem[];
  onUpdateShoppingItem: (item: ShoppingItem) => void;
  onDeleteShoppingItem: (id: number) => void;
  onMoveToExpenses: (item: ShoppingItem) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingItems, onUpdateShoppingItem, onDeleteShoppingItem, onMoveToExpenses }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <h3 className="font-semibold text-lg mb-3 text-gray-700">Shopping List</h3>
      {shoppingItems.length === 0 ? (
        <p className="text-gray-500">No items in the shopping list.</p>
      ) : (
        <ul>
          {shoppingItems.map((item) => (
            <ShoppingListItem
              key={item.id}
              item={item}
              onUpdate={onUpdateShoppingItem}
              onDelete={onDeleteShoppingItem}
              onMoveToExpenses={onMoveToExpenses}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
