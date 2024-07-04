

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
    const [newTaskText, setNewTaskText] = useState("")
    /**
   * The list of todo items.
   *
   * @type {Array<TodoItem>}
   */
    const [todos,setTodos] = useState([
        {
            id:1,
            text:"Learn React",
            completed: true
            },
            {
                id:2,
                text:"Learn React Native",
                completed: false
                }
    ])
    
     /**
   * Adds a new task to the list of todo items.
   *
   * @param {string} newTaskText The text of the new task.
   */
   function AddTask(newTaskText){
    const newTask  =  {
        id:Date.now(),
        text:newTaskText,
        completed:false}
        setTodos([...todos,newTask])
        setNewTaskText("")
   }
/**
   * Deletes a todo item from the list.
   *
   * @param {number} id The ID of the todo item to be deleted.
   */
   function deleteTask(id){
    setTodos(todos.filter(
        todo => todo.id !== id
        

    ))
   }


  /**
   * Toggles the completion status of a todo item.
   *
   * @param {number} id The ID of the todo item to be toggled.
   */
   function toggleCompleted(id){
    setTodos(todos.map(todo => {
        if (todo.id === id) {
        return {...todo, completed: !todo.completed};
        } else {
        return todo;
        }
        }))
   }
    return(
        <div className="todo-list container border p-5">
            <input 
            type="text" 
            value={newTaskText} 
            onChange={(e) => {
                setNewTaskText(e.target.value)
            
            }} />
            <button type="button" onClick={ () => {
                AddTask(newTaskText)
            }}> ADD</button>
            {todos.map(todo => (
              <TodoItem 
              key={todo.id} 
              todo={todo}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}  />
                
                ))}
        </div>
    )

   }
/***
 * TODO
 * chaine vide non accepte
 * 
 */
/**
 * Example usage:
 *
 * <TodoList />
 */

/* 

*/

   export default TodoList