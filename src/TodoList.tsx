import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoIdsSelector, todoSelector, todoActions } from "./store";
import { UUID } from "./uuid";
import {Todo} from "./Todo"




const uuid = new UUID();

  //  <Todo/>

export const TodoList = React.memo(() => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const todos = useSelector(todoIdsSelector);
  const [showActive, setShowActive] = useState(true);
  const dispatch = useDispatch();

  const [status, setStatus] = useState("active"); // add status state to keep track of selected option

  const addTodo = (firstName: string, lastName: string, status: string) =>
    dispatch(
      todoActions.createTodo({
        uniqueID: uuid.next(),
        completed: false,
        firstName,
        lastName,
        status, // pass status to the createTodo action
      })
    );

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;
    addTodo(firstName, lastName, status); // pass status to addTodo function
    firstNameRef.current!.value = "";
    lastNameRef.current!.value = "";
  };

  return (
    <div>
      <form className="form" onSubmit={handleAddTodo}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input required id="firstName" type="text" placeholder="First name" ref={firstNameRef} />
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input id="lastName" required type="text" placeholder="Last name" ref={lastNameRef} />
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
       <table>
       <tbody>
         {todos.map((id) => (
           <Todo id={id} key={id} />
         ))}
       </tbody>
     </table>
     
      ) : (
        <div className="no-contacts"> <p>&#10060; No contacts found</p> <p className="sub-para">Please add Contact</p> </div>
      )}
    </div>
  );
});

