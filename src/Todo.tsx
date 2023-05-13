import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todoIdsSelector, todoSelector, todoActions } from './store';

// import { UUID } from "./uuid";


export const Todo = React.memo<{ id: string }>(({ id }) => {
  // const { firstName, lastName, completed, status } = useSelector(todoSelector(id));
  const { firstName, lastName, completed, status } = useSelector(todoSelector(id));
  const dispatch = useDispatch();

  const deleteTask = () =>
    dispatch(
      todoActions.deleteTodo({
        uniqueID: id,
      })
    );

  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedStatus, setEditedStatus] = useState(status);

  const saveEditedTask = () => {
    dispatch(
      todoActions.updateTodo({
        uniqueID: id,
        firstName: editedFirstName,
        lastName: editedLastName,
        status : editedStatus
      })
    );
    setEditMode(false);
  };

  return (
    
      <tr className="table-list">
        <td
          className={`todo ${completed ? "completed" : ""} ${
            editMode ? "edit-mode" : ""
          }`.trim()}
        >
          {editMode ? (
            <div className="edit-inputs">
              <div>
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  value={editedFirstName}
                  onChange={(event) => setEditedFirstName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  value={editedLastName}
                  onChange={(event) => setEditedLastName(event.target.value)}
                />
              </div>
              <div>
          <label>
            <input type="radio" name="status" value="Active"  onChange={() => setEditedStatus("Active")} /> Active
          </label>
          <label>
            <input type="radio" name="status" value="InActive"  onChange={() => setEditedStatus("InActive")} /> InActive
          </label>
        </div>
            </div>
          ) : (
            <div>
              <pre>First name :   {`${firstName} `}</pre>
              <pre>Last name  :   {`${lastName}`}</pre>
              <pre className="status">Status        :   {status}</pre>
            </div>
          )}
        </td>
        <td>
          {editMode ? (
            <div>
              <button className="save-btn" onClick={saveEditedTask}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setEditedFirstName(firstName);
                  setEditedLastName(lastName);
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button className="delete-btn" onClick={deleteTask}>
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    
  );
  
});
