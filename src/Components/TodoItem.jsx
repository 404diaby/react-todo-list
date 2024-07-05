/* import React from 'react';
function TodoItem({ task, deleteTask, toggleCompleted }) {
function handleChange() {
 toggleCompleted(task.id);
 }
 
 return (
 <div className="todo-item">
 <input 
 type="checkbox"
 checked={task.completed}
 onChange={handleChange}
 />
<p>{task.text}</p>
<button onClick={() => deleteTask(task.id)}>
 X
 </button>
 </div>
 );
}
export default TodoItem; */


import React from "react";
import { useState } from "react";
/**
 * TodoItem component
 * 
 * A single todo item component that displays a checkbox, task text, and a delete button.
 * 
 * @param {object} todo - The todo item object with `id`, `text`, and `completed` properties.
 * @param {function} handleDeleteTask - A function to delete the todo item.
 * @param {function} handleToggleCompleted - A function to toggle the completion status of the todo item.
 * @param {function} handleEditTask - A function to edit the todo item.
 * 
 * @example
 * <TodoItem todo={{ id: 1, text: 'Buy milk', completed: false }} deleteTask={(id) => console.log(`Deleted todo ${id}`)} toggleCompleted={(id) => console.log(`Toggled todo ${id}`)} />
 */
function TodoItem({ todo, handleDeleteTask, handleToggleCompleted, handleEditTask }) {
    /* todo */
    const [editedTaskText, setEditedTaskText] = useState('');

    return (
        <div className={todo.editing ?
            "todo-item w-100 p-2 mb-3 d-flex gap-3 justify-content-between align-items-center rounded bg-light border border-warning " : "todo-item w-100 p-2 mb-3 d-flex gap-3 justify-content-between align-items-center rounded bg-light"

        } >
            < input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                    handleToggleCompleted(todo.id)
                }
                } />

            {
                todo.editing ? <input type="text"
                    value={editedTaskText}

                    onChange={(e) => setEditedTaskText(e.target.value)} /> : <p key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> {todo.text} </p>
            }

            <button type="button" onClick={() => handleEditTask(editedTaskText, todo.id)}>
                {
                    todo.editing ? "SAV" : "EDI"
                }
            </button>
            <button type="button" onClick={() => handleDeleteTask(todo.id)}>DEL</button>
        </div >
    )

}

export default TodoItem