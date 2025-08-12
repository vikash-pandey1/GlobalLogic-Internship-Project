import React from "react";
import TaskManager from "./components/TaskManager";
import ChatBot from "./components/ChatBot";
import "./App.css"
const App = () => {
  return (
    <div className="app-wrapper" >
      <TaskManager />
      <ChatBot/>
    </div>

  );
};

export default App;
