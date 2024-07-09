import React from 'react'
import { MdTitle } from "react-icons/md";
import { BsBodyText } from "react-icons/bs";
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form'





const priorityOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
];



const AddTaskForm = ({ onAddTask, onClose }) => {


    const { register, handleSubmit, formState: { errors }, control } = useForm()


    const AddTask = (data) => {
        try {
            const newTask = {
                id: Date.now(),
                date: new Date(),
                lastUpdate: new Date(),
                title: data.title,
                body: data.body,
                priority: data.priority,
                completed: false,
                editing: false,
            };



            onAddTask(newTask)
            onClose()
            console.log(`Tâche ajoutée :`)
            console.table(newTask)

        } catch (error) {
            onClose()
            console.error(`une erreur lors de l'ajout d'une tache : ${error.message}`)


        }
    }

    const onSubmit = (data) => {
        console.log(data)
        AddTask(data);

    };



    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => { e.stopPropagation() }}>
                <div className="modal-header">
                    <div className="modal-title">
                        <p className="h4"> Add a new task </p>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
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
                    <Controller
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
                </div>

                <div className="modal-footer">
                    <button type='submit' className='btn btn-outline-primary'>Add This Task</button>
                </div>




            </form >
        </>
    )



}

export default AddTaskForm