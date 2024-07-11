import React from "react";
import { useState } from "react";
import Select from 'react-select';
import { BsBodyText } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import ReactMarkdown from 'react-markdown';




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
const TodoItem = ({ todo, handleDeleteTask, handleToggleCompleted, handleEdit }) => {

    /**
 * State variable to store the edited task text.
 *
 */
    const [editedTitleTask, setEditedTitleTask] = useState(todo.title);
    const [editedBodyTask, setEditedBodyTask] = useState(todo.body);

    const [isDisabled, setIsDisabled] = useState(todo.completed);

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
    const handleEditTask = () => {

        handleEdit(todo.id, editedBodyTask, "body");
        handleEdit(todo.id, editedTitleTask, "title");
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
        <div key={todo.id} className={todo.editing ?
            "  todo-item  p-2   rounded bg-light border border-3 border-warning d-flex flex-column gap-3" : "d-flex flex-column gap-2 todo-item  p-2   rounded bg-light"

        } style={{/*  width: '500px', minHeight: '300px' */ }} >
            <div className="input-group">
                <span className="input-group-text">
                    < input
                        type="checkbox"
                        checked={todo.completed}
                        disabled={todo.editing}
                        onChange={() => {
                            console.table(todo)
                            setIsDisabled(!todo.completed)
                            handleToggleCompleted(todo.id)
                        }} />
                </span>
                <input
                    className="form-control "
                    type="text"
                    value={editedTitleTask}
                    onChange={(e) => setEditedTitleTask(e.target.value)}
                    disabled={!todo.editing}
                    style={{ textDecoration: todo.editing ? 'none' : todo.completed ? 'line-through' : 'none' }}
                />
            </div>
            <div className="input-group flex-grow-1 ">
                <span className="input-group-text"><BsBodyText /></span>
                {
                    todo.editing
                        ? (<textarea
                            className="form-control "
                            rows={5}
                            value={editedBodyTask}
                            onChange={(e) => setEditedBodyTask(e.target.value)}
                            aria-label="With textarea"
                            disabled={!todo.editing}
                            style={{ textDecoration: todo.editing ? 'none' : todo.completed ? 'line-through' : 'none' }} />)
                        : (<div className=" form-control text-left "

                            style={{ backgroundColor: '#E9ECEF', textDecoration: todo.editing ? 'none' : todo.completed ? 'line-through' : 'none' }}>
                            <ReactMarkdown>{editedBodyTask}</ReactMarkdown>
                        </div>)
                }




            </div>
            <div className="d-flex justify-content-between align-items-center">
                <Select
                    defaultValue={priorityOptions.find((opt) => opt.value === todo.priority)}
                    onChange={(option) => {
                        handleEdit(todo.id, option.value, "priority")
                    }}
                    options={priorityOptions}
                    isSearchable={false}
                    isDisabled={isDisabled}

                /> <span data-bs-toggle="tooltip" title={`created : ${new Date(todo.date).toLocaleDateString()}`}  >{`last updated le : ${new Date(todo.lastUpdate).toLocaleDateString()}`}</span>
                <div className="d-flex gap-1">
                    <button className="btn btn-outline-warning" name="EditTask" type="button" onClick={handleEditTask}>
                        {
                            todo.editing ? <FaSave /> : <MdEdit />
                        }
                    </button>

                    <button className="btn btn-outline-danger" type="button" onClick={handleDelete}><MdDelete /></button>

                </div>


            </div>
        </div >
    )

}

export default TodoItem