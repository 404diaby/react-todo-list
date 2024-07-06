

import React from 'react';
import { useState } from "react"
import TodoItem from "./TodoItem"

/**
 * A TodoList component that displays a list of todo items and allows users to add new tasks.
 *
 * @returns {React.ReactElement} A React element representing the TodoList component.
 */
function TodoList() {
    /**
   * The text of the new task to be added.
   *
   * @type {string}
   */
    const [newTaskInputValue, setNewTaskInputValue] = useState("")
    /**
   * The list of todo items.
   *
   * @type {Array<TodoItem>}
   */
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React", priority: "Low", completed: true, editing: false },
        { id: 2, text: "Learn React Native", priority: "High", completed: false, editing: false }
    ])
    /* TODO */
    const [filterText, setFilterText] = useState('');
    const [sortOption, setSortOption] = useState('none');

    /**
  * Adds a new task to the list of todo items.
  *
  * @param {string} newTaskInputValue -  The text of the new task.
  */
    function handleAddTask(newTaskInputValue) {
        const newTask = {
            id: Date.now(),
            text: newTaskInputValue,
            priority: "Low",
            completed: false,
            editing: false
        }
        setTodos([...todos, newTask])
        setNewTaskInputValue("")
    }
    /**
       * Deletes a todo item from the list.
       *
       * @param {number} id - The ID of the todo item to be deleted.
       */
    function handleDeleteTask(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }


    /**
     * Toggles the completion status of a todo item.
     *
     * @param {number} id -  The ID of the todo item to be toggled.
     */
    function handleToggleCompleted(id) {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            } else {
                return todo;
            }
        }))

    }
    /* tofDO */

    const filteredTodos = (todos, filterText) => {
        return todos.filter((todo) => {
            return todo.text.toLowerCase().includes(filterText.toLowerCase());
        });
    };
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
    /* function handleEditTask(id, newTaskText) {

        const task = todos.find((todo) => todo.id === id);
        if (!task.completed) {
            setTodos(todos.map(todo => {
                if (todo.id === id) {
                    if (task.editing) {

                        
                        if (newTaskText === '') {
                            return { ...todo, text: task.text, editing: !todo.editing };

                        } else {
                            return { ...todo, text: newTaskText, editing: !todo.editing };
                        }


                    } else {
                        return { ...todo, editing: !todo.editing };
                    }


                } else {
                    return todo;
                }
            }))
        } else {
            alert("Task is completed")
        }
    } */
    function handleEditTask(id, newValue, field) {
        const task = todos.find((todo) => todo.id === id);

        if (!task.completed) {
            setTodos(todos.map((todo) => {
                if (todo.id === id) {
                    if (field == "text") {
                        return { ...todo, [field]: newValue, editing: !todo.editing };
                    }
                    return { ...todo, [field]: newValue };

                } else {
                    return todo;
                }
            }));
        } else {
            alert("Task is completed")
            console.log(todos)
        }
    }

    return (
        <div className="todo-list container   p-4 rounded-4" style={{ backgroundColor: "#ECEDF6", }}>
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
/***
 * TODO
 * chaine vide non accepte
 * 
 */



export default TodoList