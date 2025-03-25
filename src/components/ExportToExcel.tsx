import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { getFormattedDate } from "@/lib/dateUtils"; // Import formatted date function

const ExportToExcel = () => {
  const handleExport = () => {
    const currentDate = getFormattedDate(); // Use the correct date format (DD-MM-YYYY)

    // Get data from localStorage
    const expenses = localStorage.getItem(`expenses-${currentDate}`);
    const shoppingList = localStorage.getItem("shoppingList");

    // Parse data
    const expenseData = expenses ? JSON.parse(expenses) : [];
    const shoppingData = shoppingList ? JSON.parse(shoppingList) : [];

    // Prepare worksheet data
    const expenseSheet = expenseData.map((exp: any) => ({
      Title: exp.title,
      Quantity: exp.quantity,
      Unit: exp.unit,
      Rate: exp.rate,
      Paid: exp.paidPrice,
    }));

    const shoppingSheet = shoppingData.map((item: any) => ({
      Title: item.title,
      Quantity: item.quantity,
      Unit: item.unit,
      Paid: item.paidPrice,
    }));

    // Create a workbook and add sheets
    const wb = XLSX.utils.book_new();
    const expenseWS = XLSX.utils.json_to_sheet(expenseSheet);
    const shoppingWS = XLSX.utils.json_to_sheet(shoppingSheet);

    XLSX.utils.book_append_sheet(wb, expenseWS, "Expenses");
    XLSX.utils.book_append_sheet(wb, shoppingWS, "Shopping List");

    // Write and download the file
    XLSX.writeFile(wb, `ExpenseData_${currentDate}.xlsx`);
  };

  return (
    <Button onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded">
      Export to Excel
    </Button>
  );
};

export default ExportToExcel;
