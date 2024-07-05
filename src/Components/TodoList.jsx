

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
        { id: 1, text: "Learn React", completed: true },
        { id: 2, text: "Learn React Native", completed: false }
    ])

    /**
  * Adds a new task to the list of todo items.
  *
  * @param {string} newTaskInputValue -  The text of the new task.
  */
    function handleAddTask(newTaskInputValue) {
        const newTask = {
            id: Date.now(),
            text: newTaskInputValue,
            completed: false
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

    return (
        <div className="todo-list container   p-4 rounded-4" style={{ backgroundColor: "#ECEDF6", }}>
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
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDeleteTask={handleDeleteTask}
                    handleToggleCompleted={handleToggleCompleted} />
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