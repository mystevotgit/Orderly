import * as Slider from "@radix-ui/react-slider";

export default function Filters({ min, max, filters, setFilters }) {
  const categories = ["shirt", "skirt", "shoes"];
  const genders = ["men", "women", "unisex"];
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-4">
      <h2 className="text-xl font-semibold">Filters</h2>

      {/* Gender */}
      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          className="w-full border rounded p-2"
          value={filters.gender}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">All</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="w-full border rounded p-2"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block mb-1 font-medium">Price ($)</label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={filters.range}
          min={min}
          max={max}
          step={1}
          onValueChange={(val) => update("range", val)}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-pink-500 h-full rounded-full" />
          </Slider.Track>

          {/* two thumbs for a range */}
          {filters.range.map((_, idx) => (
            <Slider.Thumb
              key={idx}
              className="block w-5 h-5 bg-white border-2 border-pink-600 rounded-full focus:outline-none"
              aria-label={idx === 0 ? "Minimum price" : "Maximum price"}
            />
          ))}
        </Slider.Root>
        <p className="text-sm mt-1">
          ${filters.range[0]} – ${filters.range[1]}
        </p>
      </div>
    </div>
  );
}