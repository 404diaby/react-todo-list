

import React from 'react';
import { useState } from "react"
import TodoItem from "./TodoItem"
import { TiThLarge } from 'react-icons/ti';

/**
 * A TodoList component that displays a list of todo items and allows users to add new tasks.
 *
 * @returns {React.ReactElement} A React element representing the TodoList component.
 */
const TodoList = ({ todos, setTodos, sortedTodos, sortOption, filteredTodos, filterText }) => {
    /**
   * The current value of the new task input field.
   */
    const [newTaskInputValue, setNewTaskInputValue] = useState('')


    /**
   * The list of todo items.
   * * @type {Array} - Array of object :  example of objet : todo =>  { id: 1, text: "Learn React", priority: "Low", completed: true, editing: false}
   */
    /*   const [todos, setTodos] = useState([
          { id: 1, title: "Learn React", body: "Fun fact: all websites use HTML — even this one. It’s a fundamental part of every web developer’s toolkit. HTML provides the content that gives web pages structure, by using elements and tags, you can add text, images, videos, forms, and more. Learning HTML basics is an important first step in your web development journey and an essential skill for front- and back-end developers.", priority: "Low", completed: true, editing: false },
          { id: 2, title: "Learn React Native", body: "You’ll find learning CSS essential in styling websites. Web developers use it to build on basic HTML and add personality to plain text pages. This course helps you expand your coding foundation and gives you CSS interactive practice to start adding colors and background images or editing layouts so you can create your very own, unique stylized web pages.", priority: "High", completed: false, editing: false }
      ]) */

    /**
   * The filter text used to filter the todo items.
   */

    /**
   * The sort option used to sort the todo items.
   */
    /*  const [sortOption, setSortOption] = useState('none'); */


    /**
     * Adds a new task to the list of todo items.
     *
     * @param {string} newTaskInputValue - The text of the new task.
     * @example handleAddTask("Learn JavaScript")
     */
    /* const handleAddTask = (newTaskInputValue) => {
        try {
            if (newTaskInputValue.trim() === '') {
                throw new Error('Task cannot be empty');
            }
            const newTask = {
                id: Date.now(),
                title: newTaskInputValue,
                body: "null",
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
    }; */


    /**
   * Deletes a todo item from the list.
   *
   * @param {number} id - The ID of the todo item to be deleted.
   * @example handleDeleteTask(1)
   */
    /*  const handleDeleteTask = (id) => {
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
    /* }
        }; */



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
    /*  const filteredTodos = (todos, filterText) => {
         return todos.filter((todo) => {
             return todo.title.toLowerCase().includes(filterText.toLowerCase());
         });
     }; */



    /**
    * Sorts the todo items based on the sort option.
    *
    * @param {array} todos - The list of todo items.
    * @param {string} sortOption - The sort option.
    * @returns {array} The sorted list of todo items.
    * @example sortedTodos(todos, "completed")
    */
    /* const sortedTodos = (todos, sortOption) => {
        switch (sortOption) {
            case 'completed':
                return todos.sort((a, b) => a.completed - b.completed);
            case 'text':
                return todos.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return todos;
        }
    }; */

    /**
    * Edits a todo item.
    *
    * @param {number} id - The ID of the todo item to be edited.
    * @param {string} newValue - The new value of the todo item.
    * @param {string} field - The field of the todo item to be edited.
    * @example handleEditTask(1, "Learn React", "text")
    */
    const handleEdit = (id, newValue, field) => {
        try {

            const task = todos.find((todo) => todo.id === id);
            if (!task) {
                throw new Error('Task not found');
            }
            if (task.completed) {
                console.log('ici')
                throw new Error('Task is completed');
            }
            if (task.editing) {

                if ((field === 'title' || field === 'body') && newValue.trim() === '') {
                    throw new Error('Content cannot be empty');

                }
            }
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        /* console.log(field) */

                        if (field === 'priority') {

                            return { ...todo, [field]: newValue, lastUpdate: new Date() }


                        }
                        if (newValue === todo.title || newValue === todo.body) {
                            return { ...todo, editing: !todo.editing }
                        } else {
                            return { ...todo, [field]: newValue, editing: !todo.editing, lastUpdate: new Date() };

                        }
                    } else {
                        return todo;
                    }
                }),
            );
        } catch (error) {
            console.error('Erreur lors de l\'edition d\'une tâche : ' + error.message);
            return;
            /*  throw new Error('Erreur lors de l\'edition d\'une tâche : ' + error.message); */
        }
    };

    return (
        <>

            <div className="todo-list   container-md d-flex flex-wrap align-items-start   gap-0 column-gap-4 row-gap-5 p-4 rounded-4" style={{ backgroundColor: "#ECEDF6", }}>


                {/*  <input
                type="text"
                className='mb-4'
                value={newTaskInputValue}
                placeholder='Add a new task'
                onChange={(e) => {
                    setNewTaskInputValue(e.target.value)
                }} /> */}
                {/* {<button type="button}" onClick={() => {
                handleAddTask(newTaskInputValue)
            }}> ADD</button> */}
                {/*  {sortedTodos(filteredTodos(todos, filterText), sortOption).map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                handleDeleteTask={handleDeleteTask}
                handleToggleCompleted={handleToggleCompleted}
                handleEdit={handleEdit}

                />

            ))} */}


                {/* {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                     handleDeleteTask={handleDeleteTask}
                    handleToggleCompleted={handleToggleCompleted}
                    handleEdit={handleEdit}

                />

            ))} */}
                {sortedTodos(filteredTodos(todos, filterText), sortOption).map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        /*  handleDeleteTask={handleDeleteTask} */
                        handleToggleCompleted={handleToggleCompleted}
                        handleEdit={handleEdit}

                    />

                ))}
            </div>
        </>

    )

}


export default TodoList