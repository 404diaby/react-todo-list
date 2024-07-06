import React from "react";
import { useState } from "react";
import Select from 'react-select';



/**
 * TodoItem component
 * 
 * A single todo item component that displays a checkbox, task text, edit button, delete button, and a priority selector.
 * 
 * @param {object} todo - The todo item object with `id`, `text`, `completed`, `editing`, and `priority` properties.
 * @param {function} handleDeleteTask - A function to delete the todo item.
 * @param {function} handleToggleCompleted - A function to toggle the completion status of the todo item.
 * @param {function} handleEditTask - A function to edit the todo item.
 * 
 * @example
 * <TodoItem 
 *   todo={{ id: 1, text: 'Buy milk', completed: false, editing: false, priority: 'Medium' }} 
 *   handleDeleteTask={(id) => console.log(`Deleted todo ${id}`)} 
 *   handleToggleCompleted={(id) => console.log(`Toggled todo ${id}`)} 
 *   handleEditTask={(id, value, field) => console.log(`Edited todo ${id} ${field} to ${value}`)} 
 * />
 */
const TodoItem = ({ todo, handleDeleteTask, handleToggleCompleted, handleEditTask }) => {

    /**
 * State variable to store the edited task text.
 *
 */
    const [editedTaskText, setEditedTaskText] = useState('');

    /**
 * Handles the edit action for a todo task.
 * 
 * Calls the `handleEditTask` function with the todo task's ID, the edited task text, and the field type ("text").
 * 
 * @param {void}
 * @returns {void}
 * 
 * Example:
 * ```
 * const todo = { id: 1, text: 'Original task text' };
 * const editedTaskText = 'Updated task text';
 * handleEdit(); // Calls handleEditTask(1, 'Updated task text', 'text')
 * ```
 */
    const handleEdit = () => {
        handleEditTask(todo.id, editedTaskText, "text");
    };


    /**
 * Handles the deletion of a todo task.
 * 
 * Calls the `handleDeleteTask` function with the `todo.id` as an argument.
 * 
 * @param {object} todo - The todo task object to be deleted.
 * @example
 * const todo = { id: 1, title: 'Buy milk' };
 * handleDelete(todo); // Calls handleDeleteTask with todo.id (1)
 */
    const handleDelete = () => {
        handleDeleteTask(todo.id);
    };


    /**
 * An array of priority options for tasks used in select HTML element thank to react-select librairy 
 *
 *
 * @type {Array<{ value: string, label: string }>}
 */
    const priorityOptions = [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
    ];



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
                todo.editing ? (
                    <textarea
                        value={editedTaskText}
                        onChange={(e) => setEditedTaskText(e.target.value)}
                        rows={1}
                    />
                ) : (
                    <p key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> {todo.text} </p>
                )

            }

            <button type="button" onClick={handleEdit}>
                {
                    todo.editing ? "SAV" : "EDI"
                }
            </button>
            <button type="button" onClick={handleDelete}>DEL</button>

            <Select
                defaultValue={priorityOptions.find((opt) => opt.value === todo.priority)}
                onChange={(option) => handleEditTask(todo.id, option.value, "priority")}
                options={priorityOptions}
            />

        </div >
    )

}

export default TodoItem