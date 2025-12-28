import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Circle, RotateCcw, Search, ExternalLink, BrainCircuit } from 'lucide-react';

// FULL 80-DAY DATASET
const rawData = [
  // --- STAGE 0 ---
  { day: 1, stage: "Stage 0: Launchpad", topic: "Install Python, pip, Jupyter, VSCode. Refresh Python basics", resources: "Python.org, W3Schools Python, Jupyter Docs" },
  { day: 2, stage: "Stage 0: Launchpad", topic: "Git & GitHub basics: commits, branches, pushing code", resources: "GitHub Docs, Traversy Media GitHub Crash Course" },
  { day: 3, stage: "Stage 0: Launchpad", topic: "Virtual environments & Git practice", resources: "RealPython venv tutorial, GitHub CLI docs" },
  
  // --- STAGE 1 ---
  { day: 4, stage: "Stage 1: Data Wrangler", topic: "NumPy basics: arrays, indexing, broadcasting", resources: "NumPy Docs, freeCodeCamp NumPy video" },
  { day: 5, stage: "Stage 1", topic: "NumPy slicing, operations", resources: "W3Schools NumPy Tutorial" },
  { day: 6, stage: "Stage 1", topic: "Pandas Series & DataFrames", resources: "Kaggle Pandas Course, Pandas Docs" },
  { day: 7, stage: "Stage 1", topic: "Pandas filtering, sorting, groupby", resources: "DataSchool YouTube Pandas series" },
  { day: 8, stage: "Stage 1", topic: "Handling missing data, duplicates, outliers", resources: "Kaggle Data Cleaning Notebook" },
  { day: 9, stage: "Stage 1", topic: "Matplotlib: line/bar/pie plots", resources: "Corey Schafer’s Matplotlib YouTube series" },
  { day: 10, stage: "Stage 1", topic: "Seaborn: distplot, heatmap, pairplot", resources: "StatQuest Seaborn intro" },
  { day: 11, stage: "Stage 1", topic: "Combined EDA with Pandas + Seaborn", resources: "Titanic Dataset (Kaggle), Kaggle Notebooks" },
  { day: 12, stage: "Stage 1", topic: "Full data cleaning + feature selection", resources: "Titanic Dataset" },
  { day: 13, stage: "Stage 1", topic: "Recap Quiz + small visual report", resources: "Self-made or from Kaggle quizzes" },
  
  // --- STAGE 2 ---
  { day: 14, stage: "Stage 2: Math Foundation", topic: "Mean, Median, Mode, StdDev", resources: "Khan Academy Stats, StatQuest YouTube" },
  { day: 15, stage: "Stage 2", topic: "Probability intro, Bayes’ Theorem", resources: "William Hines book, 3Blue1Brown" },
  { day: 16, stage: "Stage 2", topic: "Normal distribution, z-scores", resources: "Statistics HowTo blog" },
  { day: 17, stage: "Stage 2", topic: "Covariance, Correlation", resources: "StatQuest Covariance video" },
  { day: 18, stage: "Stage 2", topic: "Vectors, matrix multiplication", resources: "Linear Algebra by Gilbert Strang (MIT OCW)" },
  { day: 19, stage: "Stage 2", topic: "Inverse, determinant, dot products", resources: "Khan Academy LA" },
  { day: 20, stage: "Stage 2", topic: "Calculus intro: functions, gradients", resources: "3Blue1Brown: Calculus + Gradient Descent" },
  { day: 21, stage: "Stage 2", topic: "Optimization: local min, max, loss curves", resources: "Josh Starmer’s Gradient Descent explainer" },
  { day: 22, stage: "Stage 2", topic: "Graph theory basics", resources: "Play with Graphs by Amit Aggarwal" },
  { day: 23, stage: "Stage 2", topic: "Practice: NumPy matrix ops", resources: "NumPy documentation examples" },
  { day: 24, stage: "Stage 2", topic: "Practice: descriptive stats", resources: "Pandas describe() + visualization" },
  { day: 25, stage: "Stage 2", topic: "Recap/Quiz + Graphs & Prob. Review", resources: "Self-review / assignments" },
  
  // --- STAGE 3 ---
  { day: 26, stage: "Stage 3: ML Apprentice", topic: "Intro to Scikit-learn", resources: "SKLearn Docs + Sentdex ML playlist" },
  { day: 27, stage: "Stage 3", topic: "Supervised vs Unsupervised", resources: "StatQuest - Supervised vs Unsupervised" },
  { day: 28, stage: "Stage 3", topic: "Linear regression", resources: "Hands-on ML Ch. 4 + SKLearn tutorial" },
  { day: 29, stage: "Stage 3", topic: "Ridge, Lasso regression", resources: "SKLearn docs on Ridge/Lasso" },
  { day: 30, stage: "Stage 3", topic: "Logistic regression + classification metrics", resources: "StatQuest + SKLearn examples" },
  { day: 31, stage: "Stage 3", topic: "K-Nearest Neighbors", resources: "SKLearn Docs, Youtube walkthrough" },
  { day: 32, stage: "Stage 3", topic: "Decision Trees", resources: "Hands-on ML book, SKLearn guide" },
  { day: 33, stage: "Stage 3", topic: "Random Forests", resources: "StatQuest + Kaggle Titanic example" },
  { day: 34, stage: "Stage 3", topic: "SVM + kernel tricks", resources: "SKLearn SVM examples + Intuition video" },
  { day: 35, stage: "Stage 3", topic: "Naive Bayes classifiers", resources: "Sentdex ML playlist" },
  { day: 36, stage: "Stage 3", topic: "K-means clustering", resources: "StatQuest K-means, SKLearn demos" },
  { day: 37, stage: "Stage 3", topic: "Evaluation metrics", resources: "Confusion matrix, AUC" },
  { day: 38, stage: "Stage 3", topic: "Cross-validation techniques", resources: "SKLearn: KFold, StratifiedKFold" },
  { day: 39, stage: "Stage 3", topic: "Feature engineering", resources: "OneHotEncoder, StandardScaler" },
  { day: 40, stage: "Stage 3", topic: "GridSearchCV", resources: "SKLearn documentation" },
  { day: 41, stage: "Stage 3", topic: "Complete pipeline", resources: "sklearn.pipeline + ColumnTransformer" },
  { day: 42, stage: "Stage 3", topic: "Pipeline practice + preprocessing", resources: "Titanic Dataset Revisited" },
  { day: 43, stage: "Stage 3", topic: "Pipeline practice + model evaluation", resources: "Cross-validation + score" },
  { day: 44, stage: "Stage 3", topic: "End-to-End Mini Project - Setup", resources: "Boston Housing or Iris dataset" },
  { day: 45, stage: "Stage 3", topic: "End-to-End Mini Project - Build & Document", resources: "Hands-on ML end-to-end" },
  
  // --- STAGE 4 ---
  { day: 46, stage: "Stage 4: Deep Learning", topic: "Choose framework: Tensorflow or PyTorch", resources: "Tensorflow Docs, PyTorch Tutorials" },
  { day: 47, stage: "Stage 4", topic: "Neural networks: perceptrons, layers", resources: "3Blue1Brown, DeepLizard intro" },
  { day: 48, stage: "Stage 4", topic: "Build MLP with Keras or PyTorch", resources: "Tensorflow/Keras beginner guide" },
  { day: 49, stage: "Stage 4", topic: "Epochs, overfitting, dropout", resources: "DeepLizard Regularization" },
  { day: 50, stage: "Stage 4", topic: "Loss functions & optimizers", resources: "Cross-Entropy, MSE" },
  { day: 51, stage: "Stage 4", topic: "CNN intro: filters, kernels", resources: "CNN Explainer, Stanford CS231n" },
  { day: 52, stage: "Stage 4", topic: "CNN Architecture", resources: "Keras Conv2D + MaxPooling" },
  { day: 53, stage: "Stage 4", topic: "Train CNN on MNIST", resources: "Keras built-in MNIST code" },
  { day: 54, stage: "Stage 4", topic: "Dropout, data augmentation", resources: "tf.keras.preprocessing.image" },
  { day: 55, stage: "Stage 4", topic: "Saving & loading models", resources: "tf.keras.models.save/load_model" },
  { day: 56, stage: "Stage 4", topic: "TensorBoard visualization", resources: "TensorBoard Docs + demo" },
  { day: 57, stage: "Stage 4", topic: "Transfer learning (MobileNet, ResNet)", resources: "Keras Applications API" },
  { day: 58, stage: "Stage 4", topic: "Fine-tune on small custom dataset", resources: "Tensorflow Fine-tuning Docs" },
  { day: 59, stage: "Stage 4", topic: "CNN recap, visualization", resources: "Tensorflow notebooks" },
  { day: 60, stage: "Stage 4", topic: "Practice DL pipeline: Cats vs Dogs", resources: "Kaggle notebook" },
  
  // --- STAGE 5 ---
  { day: 61, stage: "Stage 5: AI Virtuoso", topic: "Transformers architecture", resources: "Illustrated Transformer blog" },
  { day: 62, stage: "Stage 5", topic: "Hugging Face library", resources: "Hugging Face course + docs" },
  { day: 63, stage: "Stage 5", topic: "Tokenization & attention", resources: "HF tokenizer docs, 3B1B Attention" },
  { day: 64, stage: "Stage 5", topic: "Text classification with BERT", resources: "Hugging Face pipeline tutorial" },
  { day: 65, stage: "Stage 5", topic: "Fine-tuning BERT", resources: "HF Trainer API" },
  { day: 66, stage: "Stage 5", topic: "LLM pipelines", resources: "Prompt engineering basics" },
  { day: 67, stage: "Stage 5", topic: "Reinforcement Learning basics", resources: "David Silver’s RL Series" },
  { day: 68, stage: "Stage 5", topic: "Q-Learning intro", resources: "RL with Python (sentdex)" },
  { day: 69, stage: "Stage 5", topic: "GenAI Chatbot (OpenAI/GPT)", resources: "OpenAI Cookbook" },
  { day: 70, stage: "Stage 5", topic: "Capstone: BERT Classifier or GPT Chatbot", resources: "Hugging Face space" },
  
  // --- STAGE 6 ---
  { day: 71, stage: "Stage 6: Pro Toolkit", topic: "Linux CLI basics", resources: "Ubuntu Command Cheatsheet" },
  { day: 72, stage: "Stage 6", topic: "SSH: key pair, remote login", resources: "DigitalOcean SSH Setup Guide" },
  { day: 73, stage: "Stage 6", topic: "Docker: containers, images", resources: "Docker Docs, Mosh Hamedani course" },
  { day: 74, stage: "Stage 6", topic: "Dockerize ML app", resources: "Docker + FastAPI example" },
  { day: 75, stage: "Stage 6", topic: "CI/CD with GitHub Actions", resources: "GitHub Actions Workflow Docs" },
  { day: 76, stage: "Stage 6", topic: "Cloud: AWS/GCP setup", resources: "AWS EC2 beginner guide" },
  { day: 77, stage: "Stage 6", topic: "Model deployment with Flask", resources: "Flask ML deployment tutorial" },
  { day: 78, stage: "Stage 6", topic: "Streamlit/Gradio UI", resources: "Streamlit Docs or Gradio.app" },
  { day: 79, stage: "Stage 6", topic: "Logging & monitoring", resources: "Python Logging, Prometheus" },
  { day: 80, stage: "Stage 6", topic: "Final Project polish", resources: "Custom app, GitHub README" }
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
  const getStageColor = (stageStr) => {
    const stage = stageStr.toLowerCase();
    if (stage.includes("stage 0")) return "bg-gray-100 text-gray-700 border-gray-200";
    if (stage.includes("stage 1")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (stage.includes("stage 2")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
    if (stage.includes("stage 3")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (stage.includes("stage 4")) return "bg-pink-50 text-pink-700 border-pink-200";
    if (stage.includes("stage 5")) return "bg-orange-50 text-orange-700 border-orange-200";
    if (stage.includes("stage 6")) return "bg-teal-50 text-teal-700 border-teal-200";
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
              80-Day Roadmap | Python • Pandas • PyTorch • MLOps
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
                  const stageParts = item.stage.split(":");
                  const mainStage = stageParts[0];
                  const subStage = stageParts[1] || "";
                  
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
                          {mainStage}
                        </span>
                        {subStage && (
                          <div className="text-xs text-slate-400 mt-1 pl-1">
                            {subStage.trim()}
                          </div>
                        )}
                      </td>

                      {/* Topic */}
                      <td className="p-4 border-r border-slate-200 font-semibold text-slate-800">
                        {item.topic}
                      </td>

                      {/* Resources */}
                      <td className="p-4 text-slate-500 flex items-center gap-2">
                        {item.resources.includes("http") ? (
                          <a href={item.resources.includes(" ") ? "#" : item.resources} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline flex items-center gap-1">
                             <span className="truncate max-w-[150px]" title={item.resources}>{item.resources}</span> <ExternalLink size={14} />
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