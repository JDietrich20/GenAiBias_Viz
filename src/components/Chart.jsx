import React from "react";
import Plot from "react-plotly.js";

export default function Chart({ filteredData, baselineField }) {
  if (!filteredData || filteredData.length === 0)
    return <p>No data found for selected filters.</p>;

  const row = filteredData[0];
  const metrics = ["bls", "genai"];
  const chartData = [];

  if (baselineField === "gender") {
    const genderGroups = ["women", "men"]; 
    metrics.forEach((metric) => {
      const yValues = genderGroups.map((g) =>
        g === "men"
          ? 1 - (row[`${metric}_p_women`] ?? 0)
          : row[`${metric}_p_women`] ?? 0
      );
      chartData.push({
        x: genderGroups.map((g) => g.charAt(0).toUpperCase() + g.slice(1)),
        y: yValues,
        name: metric,
        type: "bar",
        text: yValues.map((v) => Math.round(v * 100) + "%"),
        marker: { color: metric === "bls" ? "rgb(99,110,250)" : "rgb(240,84,59)" },
      });
    });
  } else if (baselineField === "ethnicity") {
    const ethnicityGroups = ["white", "black", "hispanic", "asian"];
    metrics.forEach((metric) => {
      const yValues = ethnicityGroups.map((g) => row[`${metric}_p_${g}`] ?? 0);
      chartData.push({
        x: ethnicityGroups.map((g) => g.charAt(0).toUpperCase() + g.slice(1)),
        y: yValues,
        name: metric,
        type: "bar",
        text: yValues.map((v) => Math.round(v * 100) + "%"),
        marker: { color: metric === "bls" ? "rgb(99,110,250)" : "rgb(240,84,59)" },
      });
    });
  }

  return (
    <Plot
      data={chartData}
      layout={{
        barmode: "group",
        yaxis: { title: "% of Sample", tickformat: ".0%", range: [0, 1] },
        margin: { t: 40, l: 60, r: 20, b: 40 },
        transition: { duration: 800, easing: "cubic-in-out" },
      }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "500px" }}
    />
  );
}

