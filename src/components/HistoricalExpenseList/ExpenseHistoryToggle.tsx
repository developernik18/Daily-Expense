interface ExpenseHistoryToggleProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ExpenseHistoryToggle: React.FC<ExpenseHistoryToggleProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="w-full mb-4 p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? "Hide Expense History" : "Show Expense History"}
    </button>
  );
};

export default ExpenseHistoryToggle;
