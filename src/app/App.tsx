import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "../pages/MainPage/ui/MainPage";
import RepositoryPage from "../pages/RepositoryPage/ui/RepositoryPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/repositories/:owner/:name"
            element={<RepositoryPage />}
          />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
