import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore, todoActions } from "./store";
import { TodoList } from "./TodoList";
import { Schema$Todo } from "./typings";
import "./style.css";
import App from "./App"

const store = configureStore();

// The easier and safer way to set initial value
const todos: Schema$Todo[] = [];


  todos.forEach(todo => {
    store.dispatch(todoActions.createTodo(todo));
  });

  
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
