import React from "react";
import { format } from "../utils/formatters";
import { llmNames } from "../utils/constants";

export default function Filters({

    selectedLLM,
    setSelectedLLM,
    occupations,
    selectedOccupation,
    setSelectedOccupation,
    selectedBaseline,
    setSelectedBaseline,
}) {
  return (
    <div style={{ width: "250px", marginRight: "2rem" }}>
      <h2><b><u>Filters</u></b></h2>
      <div style={{ marginBottom: "1rem" }}>
        <label><b>LLM:   </b></label>
        <select
          value={selectedLLM}
          onChange={(e) => setSelectedLLM(e.target.value)}
        >
        {Object.entries(llmNames).map(([key, name]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
      </div>

      

      <div style={{ marginBottom: "1rem" }}>
        <label><b>Occupation:   </b></label>
        <select
          value={selectedOccupation}
          onChange={(e) => setSelectedOccupation(e.target.value)}
        >
          {occupations.map((occ) => (
            <option key={occ} value={occ}> 
              {format(occ)}
            </option>
          ))}
        </select>
      </div>

      <label><b>Baseline:   </b></label>
      <div onChange={(e) => setSelectedBaseline(e.target.value)}>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            value="gender"
            checked={selectedBaseline === "gender"}
            onChange={(e) => setSelectedBaseline(e.target.value)}
          />
          Gender
        </label>
        <label>
          <input
            type="radio"
            value="ethnicity"
            checked={selectedBaseline === "ethnicity"}
            onChange={(e) => setSelectedBaseline(e.target.value)}
          />
          Ethnicity
        </label>
      </div>
    </div>

  );
}
