function SearchFilter({ onFilter }) {
  return (
    <div className="search-bar">
      {/* Search by Name */}
      <div className="search-field">
        <input
          type="text"
          placeholder="🔍 Search employee name..."
          onChange={(e) =>
            onFilter((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      {/* Gender Filter */}
      <div className="search-field">
        <select
          onChange={(e) =>
            onFilter((prev) => ({ ...prev, gender: e.target.value }))
          }
        >
          <option value="">All Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="search-field">
        <select
          onChange={(e) =>
            onFilter((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
