/* Heavily inspired by Dev Ed's video on Youtube,
  Build A Todo App With REACT | React Project For Beginners (FULL).
  Learned a lot, what a great resource! 
*/

import React, { useState,useEffect } from 'react';
import './App.css';
//Import Components
import Form from "./components/Form.js";
import TodoList from "./components/TodoList.js";
import Todo from "./components/Todo.js"

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // run once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  //use effect
  useEffect(() => {
    saveLocalTodos();
    filterHandler();
  }, [todos, status]);


  //functions and events

  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed == true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed == false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //save to local storage 
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") ===null){
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
    </header>
    <Form 
    inputText={inputText}
    todos={todos} 
    setTodos={setTodos} 
    setInputText={setInputText}
    setStatus={setStatus}
    />
    <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
} 

export default App;
