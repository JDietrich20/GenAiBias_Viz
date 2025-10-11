import React from "react";

export default function Filters({
    selectedLLM,
    setSelectedLLM,
    llms,
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
      <h2><b>Filters</b></h2>
      <div style={{ marginBottom: "1rem" }}>
        <label><b>LLM:</b></label>
        <select
          value={selectedLLM}
          onChange={(e) => setSelectedLLM(e.target.value)}
        >
          {llms.map((occ) => (
            <option key={occ} value={occ}>
              {occ}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label><b>Occupation:</b></label>
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
        <label><b>Baseline:</b></label>
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
