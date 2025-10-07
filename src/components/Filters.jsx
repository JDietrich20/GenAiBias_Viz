import React from "react";

export default function Filters({
  occupations,
  ethnicities,
  selectedOccupation,
  setSelectedOccupation,
  selectedEthnicity,
  setSelectedEthnicity,
  selectedBaseline,
  setSelectedBaseline,
}) {
  return (
    <div style={{ width: "250px", marginRight: "2rem" }}>
      <h2>Filters</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Occupation:</label>
        <select
          value={selectedOccupation}
          onChange={(e) => setSelectedOccupation(e.target.value)}
        >
          {occupations.map((occ) => (
            <option key={occ} value={occ}>
              {occ}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Baseline:</label>
        <select
          value={selectedBaseline}
          onChange={(e) => setSelectedBaseline(e.target.value)}
        >
          <option value="gender">Gender</option>
          <option value="ethnicity">Ethnicity</option>
        </select>
      </div>

      
    </div>
  );
}
