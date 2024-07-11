

import React from 'react';
import TodoItem from "./TodoItem"

/**
 * TodoList component
 * 
 * Renders a list of todo items with delete, toggle completed, and edit functionality
 *  
 * @param {array} todos - array of todo items
 * @param {function} setTodos - function to update the todo list
 * @param {function} sortedTodos - function to sort the todo list
 * @param {string} sortOption - sort option (e.g. "title", "priority", etc.)
 * @param {function} filteredTodos - function to filter the todo list
 * @param {string} filterText - filter text
 * t
 */
const TodoList = ({ todos, setTodos, sortedTodos, sortOption, filteredTodos, filterText }) => {


    /**
   * Deletes a task from the todo list
   * 
   * @param {number} id - task ID
   */
    const handleDeleteTask = (id) => {
        if (window.confirm(`Are you sure you want to delete this task ?`)) {
            const task = todos.find((todo) => todo.id === id)
            try {
                if (task === undefined) throw new Error('Task not found')
                setTodos(todos.filter((todo) => todo.id !== id))
            } catch (error) {
                console.error(`Failed to delete task : ${error.message}`)
            }
        }
    }


    /**
   * Toggles the completed status of a task
   * 
   * @param {number} id - task ID
   */
    const handleToggleCompleted = (id) => {
        const task = todos.find((todo) => todo.id === id)

        try {
            if (task === undefined) throw new Error('Task not found')
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, completed: !todo.completed };
                    } else {
                        return todo;
                    }
                }),
            )
        } catch (error) {

            console.error(`Failed to changement de la checkbox d'une tâche : : ${error.message}`)
        }
    }

    /**
   * Edits a task in the todo list
   * 
   * @param {number} id - task ID
   * @param {string} newValue - new value for the task
   * @param {string} field - field to edit (e.g. "title", "body", etc.)
   */
    const handleEdit = (id, newValue, field) => {
        //TODO handle more error 
        const task = todos.find((todo) => todo.id === id)

        try {
            if (task === undefined) throw new Error('Task not found')
            if (newValue === undefined) throw new Error('New Value not found')
            if (field === undefined) throw new Error('Field not found')
            if (task.completed) throw new Error('Task is completed')

            setTodos(
                todos.map((todo) => {

                    if (todo.id === id) {
                        const Retur = { ...todo, }
                        /* return { ...todo, [field]: newValue, lastUpdate: new Date() } */
                        if (field === 'priority') {
                            //update priority
                            return { ...todo, [field]: newValue }
                        } else if (!todo.editing) {
                            //update editing
                            return { ...todo, editing: !todo.editing }
                        } else if (field === 'title' || field === 'body') {
                            //update title or body , lastudate , editing
                            return { ...todo, [field]: newValue, lastUpdate: new Date(), editing: !todo.editing }
                        }

                    } else { return todo }
                }))


        } catch (error) {
            console.error(`Failed to edit task : ${error.message}`)
            return
        }

    }

    return (
        <>
            <div className="todo-list container  p-4 rounded-4" >

                {sortedTodos(filteredTodos(todos, filterText), sortOption).map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleCompleted={handleToggleCompleted}
                        handleEdit={handleEdit}

                    />

                ))}
            </div>
        </>

    )

}


export default TodoList