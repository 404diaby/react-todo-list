import React, { useState, useEffect } from 'react';
import GitCorner from './Components/GitCorner';
import './Components/GitCorner.css'
import TodoList from './Components/TodoList';
import './App.css'
import { IoMdAdd } from "react-icons/io";
import AddTaskForm from './Components/AddTaskForm';
import Modal from './Modal';

import Select from 'react-select';
import Attribution from './Components/Attribution';

const sortOptions = [
  { value: 'Date', label: 'Date' },
  { value: 'completed', label: 'Completed' },
  { value: 'priority', label: 'Priority' },
  { value: 'text', label: 'Text' },
 
];


const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'affichage de la modal

   /**
   * The list of todo items.
   * * @type {Array} - Array of object :  example of objet : todo =>  { id: 1, text: "Learn React", priority: "Low", completed: true, editing: false}
   */
   const [todos, setTodos] = useState([
    { id: 1,date:  new Date('2019-07-05') , "lastUpdate": new Date('2024-07-08'), title: "5- Learn React", body: "Fun fact: all websites use HTML — even this one. It’s a fundamental part of every web developer’s toolkit. HTML provides the content that gives web pages structure, by using elements and tags, you can add text, images, videos, forms, and more. Learning HTML basics is an important first step in your web development journey and an essential skill for front- and back-end developers.", priority: "Low", completed: true, editing: false },
    { id: 2,date:  new Date('2020-07-05') , "lastUpdate": new Date('2024-07-08'), title: "4- Learn React Native", body: "You’ll find learning CSS essential in styling websites. Web developers use it to build on basic HTML and add personality to plain text pages. This course helps you expand your coding foundation and gives you CSS interactive practice to start adding colors and background images or editing layouts so you can create your very own, unique stylized web pages.", priority: "High", completed: false, editing: false },
    
    {
      "id": 3,
      "date":  new Date('2021-07-05'),
      "lastUpdate": new Date('2024-07-08'),
      "title": "3 - Abner_Williamson22@yahoo.com",
      "body": "# Tâche 1\nVoici une **description** en Markdown.",
      "completed": true,
      "editing": false,
      "priority": "High"
      
    },
    {
      "id": 4,
      "date":   new Date('2022-07-05'),
      "lastUpdate": new Date('2024-07-08'),
      "title": "2 - Alexanne80@hotmail.com",
      "body": "Rebeka_Treutel31@yahoo.com",
      "completed": false,
      "editing": false,
      "priority": "Low"
    },
    {
      "id": 7,
      "date":   new Date('2023-07-05'),
      "lastUpdate": new Date('2024-07-08'),
      "title": "1 - Eddie67@gmail.com",
      "body": "Judy.Smitham@gmail.com",
      "editing": false,
      "priority": "High"
    }
])

const [sortOption, setSortOption] = useState(sortOptions[0]);

const [filterText, setFilterText] = useState('');

  const handleCloseModal = () => {
      setIsModalOpen(false); // Fermer la modal lorsque le bouton de fermeture est cliqué
  }
const handleAddTask = (newTask) => {
  setTodos([...todos, newTask]);
};

const sortedTodos = (todos, sortOption) => {
  switch (sortOption) {
      case 'completed':
          return todos.sort((a, b) => a.completed - b.completed);
      case 'priority':
        return todos.sort((a, b) => {

          if (a.priority === 'Medium' && b.priority === 'High') {
            return 1;
          } else if (a.priority === 'Low' && b.priority === 'High') {
            return 1;
          } else if (a.priority === 'Low' && b.priority === 'Medium') {
            return 1;
          }else if (a.priority === 'High' && b.priority === 'Medium') {
            return -1;
          } else if (a.priority === 'High' && b.priority === 'Low') {
            return -1;
          } else if (a.priority === 'Medium' && b.priority === 'Low') {
            return -1;
          }
          return 0
        });
      case 'text':
          return todos.sort((a, b) => a.title.localeCompare(b.title));
      default:
          return todos.sort((a, b) => b.date - a.date);;
  }
};

const filteredTodos = (todos, filterText) => {
  return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(filterText.toLowerCase());
  })
};


  return (
    <>
   
    <GitCorner/>
     <h1 className=' text-center fw-bold'>TodoList App</h1>
     
     <div className='d-flex justify-content-between mt-4 mb-2'>
       <button className='btn btn-primary d-flex align-items-center justify-content-start  gap-1' 
       onClick={() => {setIsModalOpen(true); // Ouvrir la modal lorsque le bouton est cliqué  
        }}
       ><IoMdAdd />Add Task</button> 
       <span >
        <input
        className='form-control'
          type="text"
          value={filterText}
          placeholder="Filter tasks"
          onChange={(e) => setFilterText(e.target.value)}
                />
       </span>
        
       <Select
          defaultValue={sortOption}
          onChange={(option) => setSortOption(option.value)}
          options={sortOptions}
                   
          />
     </div>
     
     <TodoList todos={todos} setTodos={setTodos} sortedTodos={sortedTodos} sortOption={sortOption} filteredTodos={filteredTodos}  filterText={filterText}/>
     <Modal isOpen={isModalOpen} onClose={ handleCloseModal}>
        <AddTaskForm onAddTask={handleAddTask} onClose={handleCloseModal} />
     </Modal>
    <Attribution/>
      <div>
    </div>
    </>
   
    
  );
};

export default App;


