import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoIdsSelector, todoActions } from "./store";
// import {Schema$Todo} from "./typings"
import { UUID } from "./uuid";
import {Todo} from "./Todo";
import "./style.css"

const uuid = new UUID();

export const TodoList = React.memo(() => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLInputElement>(null);


  const todos = useSelector(todoIdsSelector);
  const [showActive, setShowActive] = useState(true);
  const dispatch = useDispatch();

  const [status, setStatus] = useState("active");

  const addTodo = (firstname: string, lastname: string, status: any) =>
    dispatch(
      todoActions.createTodo({
        uniqueID: uuid.next(),
        task: taskRef.current?.value || "",
    completed: false,
    firstname,
    lastname,
    status,
      })
    );

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = firstNameRef.current!.value;
    const lastname = lastnameRef.current!.value;
    addTodo(firstName, lastname, status);
    firstNameRef.current!.value = "";
    lastnameRef.current!.value = "";
  };

  return (
    <div>
      <form className="form" onSubmit={handleAddTodo}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input required id="firstName" type="text" placeholder="First name" ref={firstNameRef} />
        </div>
        <div>
          <label htmlFor="lastname">Last name:</label>
          <input id="lastname" required type="text" placeholder="Last name" ref={lastnameRef} />
        </div>
        <div>
          <label>
            <input type="radio" name="status" value="active" checked={status === "active"} onChange={() => setStatus("active")} /> Active
          </label>
          <label>
            <input type="radio" name="status" value="inactive" checked={status === "inactive"} onChange={() => setStatus("inactive")} /> InActive
          </label>
        </div>
        <div>

        <button className="add-btn" type="submit">Save contact</button>
        </div>
      </form>
      <h4 style={{ marginBottom: "10px", color:"red", fontSize:"large" }}>Contact List</h4>
      {todos.length ? (
       <table className="todo-table">
       
         {todos.map((id) => {
           if (id) {
             return <Todo id={id} key={id} />
           } else {
             return null;
           }
         })}
       
     </table>
     
      ) : (
        <div className="no-contacts"> <p>&#10060; No contacts found</p> <p className="sub-para">Please add Contact</p> </div>
      )}
    </div>
  );
});

