# GenAiBias Visualization Dashboard  
*An interactive visualization of Generative AI Bias for the HCI Lab at Santa Clara University*  

## What is this and Why?  
This project provides an interactive, web-based visualization for the results in the following paper: ———————————. It was developed for the GenAI Bias team at the HCI Lab at Santa Clara University and showcased during BayLearn 2025 as a live demonstration/interactive display.  
The tool enables viewers to explore how different large language models (LLMs) perform across occupational/ethnic/gender baselines, helping to surface disparities and support discussions around fairness and accountability.  

## Tech Stack 
Framework: React with Vite
Languages: HTML, JavaScript, JSX, and CSS
Visualization Library: Plotly.js

## Project Structure  
```
├── public/
│   └── … (static assets, CSV files)  
├── src/
│   ├── components/
│   │   ├── Filters.jsx        – UI controls for LLM-selection, occupation, ethnicity, baseline  
│   │   ├── Chart.jsx          – Visualization component  
│   │   └── …  
│   ├── utils/
│   │   ├── csvLoader.js       – CSV loading helper  
│   │   ├── constants.js       – Static definitions (LLM names, etc.)  
│   │   └── formatters.js      – String formatting utilities  
│   ├── App.jsx               – Main component tying everything together  
│   └── …  
├── package.json  
├── vite.config.js  
└── README.md
```

