import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import Task from './Task';

const AddTasks = () => {
    const [user, loading, error] = useAuthState(auth);

    const [show, setShow] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(tasks => {
                console.log(tasks);
                reset();
            })
    }

    return (
        <div>
            <button onClick={() => setShow(true)} className="btn">Add Task</button>
            {
                show && <div className='mt-10'>
                    <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 gap-3 justify-items-center'>

                        <input type="email" name='email' {...register("email")} value={user?.email} className="input input-bordered input-accent w-full max-w-xs" />

                        <div className="form-control w-full max-w-xs text-center">
                            <input type="text" placeholder="Task name" className="input input-bordered w-full max-w-xs"
                                {...register("taskName", {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    }
                                })} />
                        </div>

                        <div className="form-control w-full max-w-xs text-center">
                            <textarea
                                className='textarea  textarea-bordered my-3 '
                                placeholder='Your Description'
                                rows={6}
                                {...register("taskDescription", {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    }
                                })}
                            ></textarea>

                            <input className='btn  text-white uppercase font-bold  w-full max-w-xs' type="submit" value='Complete' />
                        </div>


                    </form>
                </div>
            }
            <div className='my-8 '>
                <Link to='/task'><button className="btn">See All Tasks</button></Link>
            </div>

        </div>
    );
};

export default AddTasks;