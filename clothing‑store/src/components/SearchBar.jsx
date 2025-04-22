/* ===== File: SearchBar.jsx ============================================ */
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="w-full border rounded-xl p-3"
      placeholder="Search products…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;