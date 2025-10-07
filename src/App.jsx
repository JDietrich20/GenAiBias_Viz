import { useState, useEffect } from "react";
import { loadCSV } from "./utils/csvLoader";
import Filters from "./components/Filters";
import Chart from "./components/Chart";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
  const [selectedBaseline, setSelectedBaseline] = useState("gender"); 

  useEffect(() => {
    loadCSV(`${import.meta.env.BASE_URL}openai_converted.csv`).then((data) => {
      setData(data);
      setLoading(false);
      if (data.length > 0) setSelectedOccupation(data[0].career);
    });
  }, []);

  if (loading) return <Loader />;

  const filteredData = data.filter(
    (row) => row.career === selectedOccupation
  );
  

  const occupations = [...new Set(data.map((row) => row.career))];
  const ethnicities = [...new Set(data.map((row) => row.ethnicity))];

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      <Filters
        occupations={occupations}
        ethnicities={ethnicities}
        selectedOccupation={selectedOccupation}
        setSelectedOccupation={setSelectedOccupation}
        selectedEthnicity={selectedEthnicity}
        setSelectedEthnicity={setSelectedEthnicity}
        selectedBaseline={selectedBaseline}
        setSelectedBaseline={setSelectedBaseline} 
      />
      <div style={{ flexGrow: 1 }}>
        <h1>
          Chart for {selectedOccupation} (Baseline: {selectedBaseline})
        </h1>
        <Chart filteredData={filteredData} baselineField={selectedBaseline} />
      </div>
    </div>
  );
}

export default App;
