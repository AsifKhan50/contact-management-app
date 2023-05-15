import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  todoSelector, todoActions } from './store';
import "./style.css"

// import { UUID } from "./uuid";


export const Todo = React.memo<{ id: string }>(({ id }) => {
    const todo = useSelector(todoSelector(id));
    const dispatch = useDispatch();
  
    const deleteTask = () =>
      dispatch(
        todoActions.deleteTodo({
          uniqueID: id,
        })
      );
  
    const [editMode, setEditMode] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(todo?.firstname || "");
    const [editedLastName, setEditedLastName] = useState(todo?.lastname || "");
    const [editedStatus, setEditedStatus] = useState(todo?.status || "");
  
    const saveEditedTask = () => {
      dispatch(
        todoActions.updateTodo({
          uniqueID: id,
          firstname: editedFirstName,
          lastname: editedLastName,
          status: editedStatus,
        })
      );
      setEditMode(false);
    };
  
   return (
    <tbody>

  <tr style={{ width: '300px', margin: 'auto' }}>
    <td
      className={`todo ${todo?.completed ? "completed" : ""} ${
        editMode ? "edit-mode" : ""
      }`.trim()}
      style={{
        padding: '10px',
        border : '1px solid #000',
        backgroundColor: editMode ? '#f5f5f5' : 'none',
        textDecoration: todo?.completed ? 'line-through' : 'none',
        color: todo?.completed ? '#aaa' : 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '3px',
      }}
    >
      {editMode ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              value={editedFirstName}
              onChange={(event) => setEditedFirstName(event.target.value)}
              style={{
                marginRight: '10px',
                padding: '5px',
                border: '1px solid gray',
                borderRadius: '3px'
              }}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              value={editedLastName}
              onChange={(event) => setEditedLastName(event.target.value)}
              style={{
                marginRight: '10px',
                padding: '5px',
                border: '1px solid gray',
                borderRadius: '3px'
              }}
              />
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={editedStatus === "Active"}
                onChange={() => setEditedStatus("Active")}
                style={{ marginRight: '10px', outline: 'none', borderColor: 'black' }}
              />{" "}
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="InActive"
                checked={editedStatus === "InActive"}
                onChange={() => setEditedStatus("InActive")}
                style={{ marginRight: '10px', outline: 'none', borderColor: 'black' }}
                />{" "}
              InActive
            </label>
          </div>
          <div className='edit-mode-btn'>
            <button
              onClick={saveEditedTask}
              style={{
                marginRight: '5px',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-text" style={{ display: 'flex', justifyContent: 'space-between', flexDirection:"column" }}>
            <pre>First name : {todo?.firstname}</pre>
            <pre>Last name : {todo?.lastname}</pre>
            <pre>status : {todo?.status}</pre>
          </div>

              <div className="todo-actions">
                <button className='edit-btn' onClick={() => setEditMode(true)}>Edit</button>
                <button className='delete-btn' onClick={deleteTask}>Delete</button>
              </div>
            </>
          )}
        </td>
      </tr>
        </tbody>
    );
  });
  
