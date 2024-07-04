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




/**
 * TodoItem component
 * 
 * A single todo item component that displays a checkbox, task text, and a delete button.
 * 
 * @param {object} todo - The todo item object with `id`, `text`, and `completed` properties.
 * @param {function} deleteTask - A function to delete the todo item.
 * @param {function} toggleCompleted - A function to toggle the completion status of the todo item.
 * 
 * @example
 * <TodoItem todo={{ id: 1, text: 'Buy milk', completed: false }} deleteTask={(id) => console.log(`Deleted todo ${id}`)} toggleCompleted={(id) => console.log(`Toggled todo ${id}`)} />
 */
function TodoItem({ todo, deleteTask, toggleCompleted }) {


console.log(todo)
    return(
        <div className="todo-item p-3 m-3 d-flex gap-3 justify-content-between align-items-center border ">
    <input type="checkbox" checked={todo.completed} 
    onChange={() =>{
        toggleCompleted(todo.id)
    }} />
   <p key={todo.id} >{todo.text}</p> 
   <button type="button" onClick={() => deleteTask(todo.id)}>DEL</button>
   </div>
    )
    
}


export default TodoItem