interface ExpenseDateSelectorProps {
  dates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const ExpenseDateSelector: React.FC<ExpenseDateSelectorProps> = ({ dates, selectedDate, setSelectedDate }) => {
  return (
    <select
      className="w-full p-2 border rounded-md text-gray-700"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    >
      {dates.length === 0 ? (
        <option>No history found</option>
      ) : (
        dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))
      )}
    </select>
  );
};

export default ExpenseDateSelector;
