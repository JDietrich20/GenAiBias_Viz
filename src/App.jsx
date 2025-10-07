import { useState, useEffect } from "react";
import Papa from "papaparse";
import Plot from "react-plotly.js";



function App() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);

 
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedGender, setSelectedGender] = useState("women");
  const [selectedEthnicity, setSelectedEthnicity] = useState("");

  useEffect(() => {
    Papa.parse("/data/openai_converted.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
        if (results.data.length > 0) setSelectedOccupation(results.data[0].career);
      },
    });
  }, []);

  if (loading) return <p>Loading CSV data...</p>;

  
  const filteredData = data.find(
    (row) =>
      row.career === selectedOccupation &&
      (selectedEthnicity ? row.ethnicity === selectedEthnicity : true)
  );

  

  if (!filteredData) return <p>No data found for selected filters.</p>;

  
  const genderField = selectedGender.toLowerCase();

  const chartData = [
    {
      x: ["Female"],
      y: [Math.abs(filteredData[`bls_p_${genderField}`])],
      name: "percent_baseline",
      legendgroup: "percent_baseline",
      showlegend: true,
      type: "bar",
      text: Math.round([filteredData[`bls_p_${genderField}`]]*100) +"%",
      marker: { color: 'rgb(99, 110, 250)' },
    },
    {
      x: ["Female"],
      y: [Math.abs(filteredData[`genai_p_${genderField}`])],
      name: "percent_gpt4",
      legendgroup: "percent_gpt4",
      showlegend: true,
      type: "bar",
      text: Math.round([filteredData[`genai_p_${genderField}`]]*100) +"%",
      marker: { color: 'rgb(240, 84, 59)' },
    },
/* Hardcoded Items (Applies to Woman too)

  Temp male visualization
  Math.Round to get whole number (TEXT)
  Math.abs to avoid negative values (Y)
  Subtracting from 0.99 to flip the values for MALE GENDER visualization (Y)
  Substracting from 100 to get percentage (TEXT)
  Multiplying by 100 to get percentage (TEXT)
  Adding Percetage sign to text (TEXT)
  Male Category
  */
  {
    x: ["Male"],
    y: [Math.abs(filteredData[`bls_p_${genderField}`]-0.99)],
    name: "percent_baseline",
    legendgroup: "percent_baseline",
    showlegend: false,
    type: "bar",
    text: Math.round(100 -[filteredData[`bls_p_${genderField}`]]*100) +"%",
    marker: { color: 'rgb(99, 110, 250)' },
  },
    {
      x: ["Male"],
      y: [Math.abs(filteredData[`genai_p_${genderField}`]-0.99)],
      name: "percent_gpt4",
      legendgroup: "percent_gpt4",
      showlegend: false,
      type: "bar",
      text: Math.round(100 -[filteredData[`genai_p_${genderField}`]]*100) +"%",
      marker: { color: 'rgb(240, 84, 59)' },
    },
    
  ];

  // Extract unique values for dropdowns
  const occupations = [...new Set(data.map((row) => row.career))];
  const ethnicities = [...new Set(data.map((row) => row.ethnicity))];

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
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
          <label>Ethnicity:</label>
          <select
            value={selectedEthnicity}
            onChange={(e) => setSelectedEthnicity(e.target.value)}
          >
            <option value="">All</option>
            {ethnicities.map((eth) => (
              <option key={eth} value={eth}>
                {eth}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div style={{ flexGrow: 1 }}>
      <div style={{ minHeight: "80px", marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>ChatGPT 4.0 vs. BLS (Baseline: {'Gender'}
          {selectedEthnicity ? `, ethnicity: ${selectedEthnicity}` : ""})</h1>
        <h1 style={{ margin: 0 }}>
        Career Term: {selectedOccupation}
        </h1>
      </div>

      <Plot
        data={chartData}
        layout={{
          barmode: "group",
          yaxis: { title: "% of Sample", tickformat: ".0%", range: [0, 1] },
          margin: { t: 40, l: 60, r: 20, b: 40 },
          transition: {
            duration: 800,
            easing: "cubic-in-out",
          },
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "500px" }}
      />
    </div>

    </div>
  );
}

export default App;
