export const getFormattedDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Ensure two-digit day
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
  const year = today.getFullYear();
  return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
};
