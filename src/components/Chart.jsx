import React from "react";
import Plot from "react-plotly.js";
import { useEffect, useRef } from 'react';

export default function Chart({ filteredData, baselineField, llm }) {
  const plotRef = useRef();
  if (!filteredData || filteredData.length === 0)
    return <p>No data found for selected filters.</p>;

  const row = filteredData[0];
  const metrics = ["bls", "genai"];
  const chartData = [];
  const llmNames = {
    openai: "ChatGPT 4.0",
    deepseek: "Deepseek",
    gemini: "Gemini",
    mistral: "Mistral",
    average: "Average",
  };

  const selectedLLMName = llmNames[llm];

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
        name: metric === "bls" ? "BLS" : selectedLLMName ,
        type: "bar",
        text: yValues.map((v) => (v * 100).toFixed(1) + "%"),
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
        name: metric === "bls" ? "baseline_percent" : selectedLLMName ,
        type: "bar",
        text: yValues.map((v) => (v * 100).toFixed(1) + "%"),
        marker: { color: metric === "bls" ? "rgb(99,110,250)" : "rgb(240,84,59)" },
      });
    });
  }

  return (
    <Plot
      data={chartData}
      layout={{
        barmode: "group",
        yaxis: {
          title: { 
            text: "<b>% of Sample</b>", 
            standoff: 20, 
          },
          tickformat: ".0%",
          range: [0, 1],
          tickfont: { size: 14 },
          titlefont: { size: 16 },
        },
        xaxis: {
          title: { text: baselineField === "gender" ? "<b>Gender<b>" : "Ethnicity" },
          tickfont: { size: 14 },
          titlefont: { size: 16 },
        },
        
        margin: { t: 60, l: 100, r: 60, b: 80 },
        transition: { duration: 800, easing: "cubic-in-out" },
      }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "500px" }}
    />
  );
  
  
}

