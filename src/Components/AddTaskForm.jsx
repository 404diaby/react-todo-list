import React from 'react'
import { MdTitle } from "react-icons/md";
import { BsBodyText } from "react-icons/bs";
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form'







/**
 * AddTaskForm component
 *
 * A React component that renders a form to add a new task.
 *
 * @param {function} onAddTask - Callback function to add a new task
 * @param {function} onClose - Callback function to close the modal
 *
 */
const AddTaskForm = ({ onAddTask, onClose }) => {

    const priorityOptions = [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
    ];

    /**
       * useForm hook to manage form state and validation
       */
    const { register, handleSubmit, formState: { errors }, control } = useForm()


    /**
   * AddTask function to create a new task object and in todos array
   *
   * @param {object} data - Form data
   */
    const AddTask = (data) => {
        const newTask = {
            id: Date.now(),
            date: new Date(),
            lastUpdate: new Date(),
            title: data.title,
            body: data.body,
            priority: data.priority,
            completed: false,
            editing: false,
        }
        onAddTask(newTask)
        onClose()
        console.info(`Tâche ajoutée`)
        console.table(newTask)


    }

    /**
   * onSubmit function to handle form submission
   *
   * @param {object} data - Form data
   */
    const onSubmit = (data) => {
        try {
            if (data.title === undefined || data.body === undefined || data.priority === undefined) {
                throw new Error(`Failed to add task. Please try again.`)
            }
            AddTask(data);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return;
        } finally {
            onClose()
        }

    }



    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => { e.stopPropagation() }}>
                <div className="modal-header">
                    <div className="modal-title">
                        <p className="h4"> Add a new task </p>

                    </div>

                </div>
                <div className="modal-body d-flex flex-column gap-4" >
                    <div className=" input-group  ">
                        <span className="input-group-text">
                            <MdTitle />
                        </span>
                        <input
                            className="form-control  "
                            type="text"
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            {...register('title', { required: 'Title is required' })}

                        />


                    </div>
                    <div className="input-group">
                        <span className="input-group-text"><BsBodyText /></span>
                        <textarea
                            className="form-control"
                            rows={10}
                            placeholder="Content in Markdown language......"
                            aria-label="With textarea"
                            aria-describedby="basic-addon1"

                            {...register('body', { required: 'Content is required' })}

                        />

                    </div>


                </div>

                <div className="modal-footer mt-4 d-flex justify-content-around"><Controller
                    control={control}
                    name="priority"

                    defaultValue={priorityOptions[2].value}
                    rules={{ required: { value: true, message: 'Priority is required' } }}
                    render={({ field }) => (
                        <Select
                            defaultValue={priorityOptions[2]}
                            options={priorityOptions}
                            onChange={(({ value }) => field.onChange(value))}
                            isSearchable={false}
                        />
                    )}
                />
                    <button type='submit' className='btn btn-outline-primary'>Add This Task</button>
                </div>




            </form >
        </>
    )



}

export default AddTaskForm