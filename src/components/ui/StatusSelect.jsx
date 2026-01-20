const statusStyles = {
  APPLIED: "bg-blue-50 text-blue-700 border-blue-200",
  INTERVIEW: "bg-yellow-50 text-yellow-700 border-yellow-200",
  OFFER: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};

export default function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`text-xs font-medium px-3 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        statusStyles[value]
      }`}
    >
      <option value="APPLIED">Applied</option>
      <option value="INTERVIEW">Interview</option>
      <option value="OFFER">Offer</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
}
