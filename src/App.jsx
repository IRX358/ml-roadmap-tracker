import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Circle, RotateCcw, Search, ExternalLink, BrainCircuit } from 'lucide-react';

// Data parsed from your ML Roadmap CSV (Snippet View)
const rawData = [
  { day: 1, stage: "Stage 0: Launchpad", topic: "Install Python, pip, Jupyter, VSCode. Refresh Python basics", resources: "Python.org, W3Schools Python, Jupyter Docs" },
  { day: 2, stage: "Stage 0: Launchpad", topic: "Git & GitHub basics: commits, branches, pushing code", resources: "GitHub Docs, Traversy Media GitHub Crash Course" },
  { day: 3, stage: "Stage 0: Launchpad", topic: "Virtual environments & Git practice", resources: "RealPython venv tutorial, GitHub CLI docs" },
  { day: 4, stage: "Stage 1: Data Wrangler", topic: "NumPy basics: arrays, indexing, broadcasting", resources: "NumPy Docs, freeCodeCamp NumPy video" },
  { day: 5, stage: "Stage 1: Data Wrangler", topic: "NumPy slicing, operations", resources: "W3Schools NumPy Tutorial" },
  { day: 6, stage: "Stage 1: Data Wrangler", topic: "Pandas Series & DataFrames", resources: "Kaggle Pandas Course, Pandas Docs" },
  { day: 7, stage: "Stage 1: Data Wrangler", topic: "Pandas filtering, sorting, groupby", resources: "DataSchool YouTube Pandas series" },
  { day: 8, stage: "Stage 1: Data Wrangler", topic: "Handling missing data, duplicates, outliers", resources: "Kaggle Data Cleaning Notebook" },
  { day: 9, stage: "Stage 1: Data Wrangler", topic: "Matplotlib: line/bar/pie plots", resources: "Corey Schafer’s Matplotlib YouTube series" },
  { day: 10, stage: "Stage 1: Data Wrangler", topic: "Seaborn: distplot, heatmap, pairplot", resources: "StatQuest Seaborn intro" },
  { day: 11, stage: "Stage 1: Data Wrangler", topic: "Combined EDA with Pandas + Seaborn", resources: "Titanic Dataset (Kaggle), Kaggle Notebooks" },
  { day: 12, stage: "Stage 1: Data Wrangler", topic: "Full data cleaning + feature selection", resources: "Titanic Dataset" },
  { day: 13, stage: "Stage 1: Data Wrangler", topic: "Recap Quiz + small visual report", resources: "Self-made or from Kaggle quizzes" },
  { day: 14, stage: "Stage 2: Math Foundation", topic: "Mean, Median, Mode, StdDev", resources: "Khan Academy, StatQuest" },
  
  // Placeholder for Days 15-57 - You can add these later!
  { day: 15, stage: "Stage 2: Math Foundation", topic: "Probability Basics", resources: "Khan Academy" },
  
  { day: 58, stage: "Stage 4: Deep Learning", topic: "Fine-tune on small custom dataset", resources: "Tensorflow Fine-tuning Docs" },
  { day: 59, stage: "Stage 4: Deep Learning", topic: "CNN recap, visualization", resources: "Tensorflow notebooks" },
  { day: 60, stage: "Stage 4: Deep Learning", topic: "Practice DL pipeline: Cats vs Dogs", resources: "Kaggle notebook" },
  { day: 61, stage: "Stage 5: AI Virtuoso", topic: "Transformers architecture", resources: "Illustrated Transformer blog" },
  { day: 62, stage: "Stage 5: AI Virtuoso", topic: "Hugging Face library", resources: "Hugging Face course + docs" },
  { day: 63, stage: "Stage 5: AI Virtuoso", topic: "Tokenization & attention", resources: "HF tokenizer docs, 3B1B Attention" },
  { day: 64, stage: "Stage 5: AI Virtuoso", topic: "Text classification with BERT", resources: "Hugging Face pipeline tutorial" },
  { day: 65, stage: "Stage 5: AI Virtuoso", topic: "Fine-tuning BERT", resources: "HF Trainer API" },
  { day: 66, stage: "Stage 5: AI Virtuoso", topic: "LLM pipelines", resources: "Prompt engineering basics" },
  { day: 67, stage: "Stage 5: AI Virtuoso", topic: "Reinforcement Learning basics", resources: "David Silver’s RL Series" },
  { day: 68, stage: "Stage 5: AI Virtuoso", topic: "Q-Learning intro", resources: "RL with Python (sentdex)" },
  { day: 69, stage: "Stage 5: AI Virtuoso", topic: "GenAI Chatbot (OpenAI/GPT)", resources: "OpenAI Cookbook" },
  { day: 70, stage: "Stage 5: AI Virtuoso", topic: "Capstone: BERT Classifier or GPT Chatbot", resources: "Hugging Face space" },
  { day: 71, stage: "Stage 6: Pro Toolkit", topic: "Linux CLI basics", resources: "Ubuntu Command Cheatsheet" },
  { day: 72, stage: "Stage 6: Pro Toolkit", topic: "SSH: key pair, remote login", resources: "DigitalOcean SSH Setup Guide" },
  { day: 73, stage: "Stage 6: Pro Toolkit", topic: "Docker: containers, images", resources: "Docker Docs, Mosh Hamedani course" },
  { day: 74, stage: "Stage 6: Pro Toolkit", topic: "Dockerize ML app", resources: "Docker + FastAPI example" },
  { day: 75, stage: "Stage 6: Pro Toolkit", topic: "CI/CD with GitHub Actions", resources: "GitHub Actions Workflow Docs" },
  { day: 76, stage: "Stage 6: Pro Toolkit", topic: "Cloud: AWS/GCP Deployment Basics", resources: "AWS Free Tier Docs" },
];

export default function MLRoadmapTracker() {
  const [completed, setCompleted] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ml_roadmap_progress_ir');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save progress
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ml_roadmap_progress_ir', JSON.stringify(completed));
    }
  }, [completed, isLoaded]);

  const toggleComplete = (day) => {
    setCompleted(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all ML progress?")) {
      setCompleted({});
    }
  };

  const downloadCSV = () => {
    const header = ["Day", "Stage", "Topic", "Resources", "Completed"];
    const rows = rawData.map(item => {
      const isDone = completed[item.day] ? "Yes" : "No";
      const row = [
        `Day ${item.day}`,
        item.stage,
        item.topic,
        item.resources,
        isDone
      ];
      return row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",");
    });

    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ml_roadmap_tracker_ir.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to get badge color based on Stage
  const getStageColor = (stage) => {
    if (stage.includes("Stage 0")) return "bg-gray-100 text-gray-700 border-gray-200";
    if (stage.includes("Stage 1")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (stage.includes("Stage 2")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
    if (stage.includes("Stage 3")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (stage.includes("Stage 4")) return "bg-pink-50 text-pink-700 border-pink-200";
    if (stage.includes("Stage 5")) return "bg-orange-50 text-orange-700 border-orange-200";
    if (stage.includes("Stage 6")) return "bg-teal-50 text-teal-700 border-teal-200";
    return "bg-slate-100 text-slate-700";
  };

  // Filter Data
  const filteredData = rawData.filter(item => 
    item.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.resources.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = rawData.length;
  const completedItems = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="text-teal-600 w-8 h-8" />
              <h1 className="text-3xl font-extrabold text-teal-700 tracking-tight">
                ML ZERO TO HERO
              </h1>
            </div>
            <p className="text-slate-600 font-medium">
              76-Day Roadmap | Python • Pandas • PyTorch • MLOps
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
             <button 
              onClick={resetProgress}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold flex-1 md:flex-none"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button 
              onClick={downloadCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md transition-all active:scale-95 font-semibold flex-1 md:flex-none"
            >
              <Download size={18} /> Export CSV
            </button>
          </div>
        </header>

        {/* Progress & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Card */}
          <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Mission Progress</span>
              <span className="text-2xl font-bold text-teal-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-teal-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-slate-400 mt-2">
              {completedItems} of {totalItems} modules completed
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search topics (e.g. Docker, BERT)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* The Tracker Table */}
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-r border-slate-200 w-16 text-center">Done</th>
                <th className="p-4 font-bold border-r border-slate-200 w-20">Day</th>
                <th className="p-4 font-bold border-r border-slate-200 w-48">Stage</th>
                <th className="p-4 font-bold border-r border-slate-200">Topic</th>
                <th className="p-4 font-bold">Resources</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const isCompleted = !!completed[item.day];
                  
                  return (
                    <tr 
                      key={item.day} 
                      className={`
                        group transition-colors hover:bg-teal-50/30 
                        ${isCompleted ? 'bg-green-50/50' : 'bg-white'}
                        border-b border-slate-100 last:border-0
                      `}
                    >
                      {/* Checkbox */}
                      <td className="p-4 border-r border-slate-200 text-center">
                        <button 
                          onClick={() => toggleComplete(item.day)}
                          className="focus:outline-none active:scale-90 transition-transform"
                        >
                          {isCompleted ? (
                            <CheckCircle className="text-green-500 w-6 h-6" />
                          ) : (
                            <Circle className="text-slate-300 group-hover:text-teal-400 w-6 h-6" />
                          )}
                        </button>
                      </td>

                      {/* Day */}
                      <td className="p-4 border-r border-slate-200 font-bold text-slate-500">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                          Day {item.day}
                        </span>
                      </td>

                      {/* Stage Badge */}
                      <td className="p-4 border-r border-slate-200">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStageColor(item.stage)}`}>
                          {item.stage.split(":")[0]}
                        </span>
                        <div className="text-xs text-slate-400 mt-1 pl-1">
                          {item.stage.split(":")[1]?.trim()}
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="p-4 border-r border-slate-200 font-semibold text-slate-800">
                        {item.topic}
                      </td>

                      {/* Resources */}
                      <td className="p-4 text-slate-500 flex items-center gap-2">
                        {item.resources.includes("http") ? (
                          <a href={item.resources} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline flex items-center gap-1">
                            Link <ExternalLink size={14} />
                          </a>
                        ) : (
                          <span className="italic text-xs md:text-sm">{item.resources}</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    No modules found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-slate-400 text-sm pb-8">
          © 2026 Irfan IR || Built with CURIOSITY
        </div>
      </div>
    </div>
  );
}