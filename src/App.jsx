import { useState, useEffect } from "react";
import { loadCSV } from "./utils/csvLoader";
import Filters from "./components/Filters";
import Chart from "./components/Chart";

import { llms, llmNames, llmsN } from "./utils/constants";
import { format } from "./utils/formatters";

function App() {
  const [data, setData] = useState([]);
  const [, setLoading] = useState(true);

  const [selectedLLM, setSelectedLLM] = useState("openai");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
  const [selectedBaseline, setSelectedBaseline] = useState("gender"); 

  useEffect(() => {
    setLoading(true); 
  
    loadCSV(`${import.meta.env.BASE_URL}${selectedLLM}_converted.csv`).then((data) => {
      setData(data);
      setLoading(false);
      if (data.length > 0) {
        const availableOccupations = data.map((row) => row.career);
        if (!availableOccupations.includes(selectedOccupation)) {
          setSelectedOccupation(data[0].career);
        }
      }
    });
  }, [selectedLLM]);


  const filteredData = data.filter(
    (row) => row.career === selectedOccupation
  );

  const occupations = [
    ...new Set(
      data
        .map((row) => row.career)
        .filter((career) => career && career.trim() !== "") 
    )
  ].sort();

  const ethnicities = [...new Set(data.map((row) => row.ethnicity))];
  const selectedLLM_name = llmNames[selectedLLM] || "Error";

  return (
    <div style={{ display: "flex", padding: "1rem" }}>
      <Filters
        occupations={occupations}
        ethnicities={ethnicities}
        llms = {llms}
        llmsN={llmsN}
        selectedLLM={selectedLLM}
        setSelectedLLM={setSelectedLLM}
        selectedOccupation={selectedOccupation}
        setSelectedOccupation={setSelectedOccupation}
        selectedEthnicity={selectedEthnicity}
        setSelectedEthnicity={setSelectedEthnicity}
        selectedBaseline={selectedBaseline}
        setSelectedBaseline={setSelectedBaseline} 
      />
      <div style={{ flexGrow: 1 }}>
        <h1>
          {selectedLLM_name} vs. BLS Baselines
        </h1>
        <h2>
         <b>Career Term:   </b><u>{format(selectedOccupation)} </u>
        </h2>
        <h3>(<b>Baseline:   </b><u>{format(selectedBaseline)}</u>)</h3>
        <Chart filteredData={filteredData} baselineField={selectedBaseline} llm = {selectedLLM} />
      </div>
    </div>
  );
}

export default App;
