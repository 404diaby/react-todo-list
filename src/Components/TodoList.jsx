

import React from 'react';
import { useState } from "react"
import TodoItem from "./TodoItem"

/**
 * A TodoList component that displays a list of todo items and allows users to add new tasks.
 *
 * @returns {React.ReactElement} A React element representing the TodoList component.
 */
const TodoList = () => {

    /**
   * The current value of the new task input field.
   */
    const [newTaskInputValue, setNewTaskInputValue] = useState('')


    /**
   * The list of todo items.
   * * @type {Array} - Array of object :  example of objet : todo =>  { id: 1, text: "Learn React", priority: "Low", completed: true, editing: false}
   */
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React", priority: "Low", completed: true, editing: false },
        { id: 2, text: "Learn React Native", priority: "High", completed: false, editing: false }
    ])

    /**
   * The filter text used to filter the todo items.
   */
    const [filterText, setFilterText] = useState('');

    /**
   * The sort option used to sort the todo items.
   */
    const [sortOption, setSortOption] = useState('none');


    /**
     * Adds a new task to the list of todo items.
     *
     * @param {string} newTaskInputValue - The text of the new task.
     * @example handleAddTask("Learn JavaScript")
     */
    const handleAddTask = (newTaskInputValue) => {
        try {
            if (newTaskInputValue.trim() === '') {
                throw new Error('Task cannot be empty');
            }
            const newTask = {
                id: Date.now(),
                text: newTaskInputValue,
                priority: 'Low',
                completed: false,
                editing: false,
            };
            setTodos([...todos, newTask]);
            setNewTaskInputValue('');
        } catch (error) {
            alert(error.message);
            throw new Error('Erreur lors de l\'ajout d\'une tâche : ' + error.message);
        }
    };


    /**
   * Deletes a todo item from the list.
   *
   * @param {number} id - The ID of the todo item to be deleted.
   * @example handleDeleteTask(1)
   */
    const handleDeleteTask = (id) => {
        const task = todos.find((todo) => todo.id === id);
        try {
            if (task.completed) {
                throw new Error('Task is completed');
            }
            const taskIndex = todos.findIndex((todo) => todo.id === id);
            if (taskIndex === -1) {
                throw new Error('Task not found');
            }
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            alert(error.message);
            /*  throw new Error('Erreur lors de la suppression d\'une tâche : ' + error.message); */
        }
    };



    /**
   * Toggles the completion status of a todo item.
   *
   * @param {number} id - The ID of the todo item to be toggled.
   * @example handleToggleCompleted(1)
   */
    const handleToggleCompleted = (id) => {
        try {
            const taskIndex = todos.findIndex((todo) => todo.id === id);
            if (taskIndex === -1) {
                throw new Error('Task not found');
            }
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, completed: !todo.completed };
                    } else {
                        return todo;
                    }
                }),
            );
        } catch (error) {
            alert(error.message);
            throw new Error('Erreur du changement de la checkbox d\'une tâche : ' + error.message);
        }
    };



    /**
   * Filters the todo items based on the filter text.
   *
   * @param {array} todos - The list of todo items.
   * @param {string} filterText - The filter text.
   * @returns {array} The filtered list of todo items.
   * @example filteredTodos(todos, "Learn")
   */
    const filteredTodos = (todos, filterText) => {
        return todos.filter((todo) => {
            return todo.text.toLowerCase().includes(filterText.toLowerCase());
        });
    };



    /**
   * Sorts the todo items based on the sort option.
   *
   * @param {array} todos - The list of todo items.
   * @param {string} sortOption - The sort option.
   * @returns {array} The sorted list of todo items.
   * @example sortedTodos(todos, "completed")
   */
    const sortedTodos = (todos, sortOption) => {
        switch (sortOption) {
            case 'completed':
                return todos.sort((a, b) => a.completed - b.completed);
            case 'text':
                return todos.sort((a, b) => a.text.localeCompare(b.text));
            default:
                return todos;
        }
    };

    /**
   * Edits a todo item.
   *
   * @param {number} id - The ID of the todo item to be edited.
   * @param {string} newValue - The new value of the todo item.
   * @param {string} field - The field of the todo item to be edited.
   * @example handleEditTask(1, "Learn React", "text")
   */
    const handleEditTask = (id, newValue, field) => {
        try {

            const task = todos.find((todo) => todo.id === id);
            if (!task) {
                throw new Error('Task not found');
            }
            if (task.completed) {
                throw new Error('Task is completed');
            }
            if (task.editing) {

                if (field === 'text' && newValue.trim() === '') {
                    throw new Error('Task text cannot be empty');
                }
            }
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        if (field === 'text') {
                            return { ...todo, [field]: newValue, editing: !todo.editing };
                        }
                        return { ...todo, [field]: newValue };
                    } else {
                        return todo;
                    }
                }),
            );
        } catch (error) {
            alert(error.message);
            throw new Error('Erreur lors de l\'edition d\'une tâche : ' + error.message);
        }
    };

    return (
        <div className="todo-list container-md   p-4 rounded-4" style={{ backgroundColor: "#ECEDF6", }}>
            <h1>TodoList</h1>
            <div>
                <input
                    type="text"
                    value={filterText}
                    placeholder="Filter tasks"
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="none">None</option>
                    <option value="completed">Completed</option>
                    <option value="text">Text</option>
                </select>
            </div>
            <input
                type="text"
                className='mb-4'
                value={newTaskInputValue}
                placeholder='Add a new task'
                onChange={(e) => {
                    setNewTaskInputValue(e.target.value)
                }} />
            <button type="button" onClick={() => {
                handleAddTask(newTaskInputValue)
            }}> ADD</button>
            {sortedTodos(filteredTodos(todos, filterText), sortOption).map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDeleteTask={handleDeleteTask}
                    handleToggleCompleted={handleToggleCompleted}
                    handleEditTask={handleEditTask}

                />

            ))}
        </div>
    )

}


export default TodoList