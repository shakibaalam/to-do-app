import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Lodaing from './Lodaing';

const Task = () => {
    const [user, loading] = useAuthState(auth);
    const [tasks, setTasks] = useState([]);
    const [selected, setSelected] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:5000/tasks/${user?.email}`)
            .then(res => res.json())
            .then(data => setTasks(data))

    }, [user?.email]);

    if (loading) {
        return <Lodaing></Lodaing>
    };

    const deleteTask = (id) => {
        const url = `http://localhost:5000/tasks/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remaining = tasks.filter(task => task._id !== id);
                setTasks(remaining);
            })

    }


    const strikeTask = id => {
        const newSelected = !selected

        const url = `http://localhost:5000/tasks/${id}`
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ newSelected })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSelected(data.acknowledged)
            })
    }
    return (
        <div>
            <h2 className='text-2xl my-8 '>All Tasks:</h2>
            <div className='card grid grid-cols-3 gap-5 bg-base-100 shadow-xl'>
                {
                    tasks.map(task =>
                        <div key={task._id} className="card-body justify-center items-center">
                            <h2 className={selected === true ? 'card-title line-through' : 'card-title'} >{task.taskName
                            }</h2>
                            <p>{task.taskDescription
                            }</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => deleteTask(task._id)} className="btn btn-primary">Delete</button>
                                <button onClick={() => strikeTask(task._id)} className="btn btn-primary">Complete</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Task;