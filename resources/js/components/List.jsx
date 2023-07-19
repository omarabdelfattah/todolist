import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client'
import { ToastContainer, toast } from 'react-toastify';
import RiseLoader from "react-spinners/RiseLoader";
import LoadingOverlay from 'react-loading-overlay-ts';
function List() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };


  useEffect(() => {
    setLoading(true);
    axiosClient.get('/api/tasks')
    .then(response => {
      setTasks(response.data.data);
    })
    .catch(error => {
      if(error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error('Something went wrong.');
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const addTask = () => {
    if(loading) return;
    setLoading(true);
    if (newTask.trim() === '') {
      toast.error('Task description cannot be empty.');
      return;
    }
    axiosClient.post('/api/tasks', {
      description: newTask
    })
    .then(response => {
      toast.success(response.data.message);
      setTasks([...tasks, response.data.data[0]]);
    })
    .catch(error => {
      if(error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error('Something went wrong.');
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const deleteTask = (index) => {
    if(loading) return;
    setLoading(true);
    axiosClient.delete(`/api/tasks/${tasks[index].id}`)
    .then(response => {
      toast.success(response.data.message);
      const updatedTasks = tasks.filter((task, i) => i !== index);
      console.log(updatedTasks);
      setTasks(updatedTasks);
    })
    .catch(error => {
      if(error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error('Something went wrong.');
      }
    })
    .finally(() => {
      setLoading(false);
    });


  };

  const handleCheckboxChange = (index) => {
    if(loading) return;
    setLoading(true);
    axiosClient.patch(`/api/tasks/${tasks[index].id}`, {
      completed: !tasks[index].completed
    })
    .then(response => {
      toast.success(response.data.message);
      const updatedTasks = tasks.map((task, i) =>i === index ? { ...task, completed: !task.completed } : task
        );
      setTasks(updatedTasks);
    })
    .catch(error => {
      if(error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error('Something went wrong.');
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

 

  return (
    <>
      {loading && (
          <LoadingOverlay
          active={loading}
          spinner={<RiseLoader color="rgba(54, 215, 183, 1)" />}
          className='full-screen-overlay'
          />
        )
      }
      <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Todo List</h3>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new task..."
              value={newTask}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary" type="button" onClick={addTask}>
              Add
            </button>
          </div>

          <ul className="list-group">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`list-group-item d-flex justify-content-between ${
                  task.completed ? 'list-group-item-success' : ''
                }`}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label
                    className="form-check-label"
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      marginLeft: '5px',
                    }}
                  >
                    {task.description}
                  </label>
                </div>
                <div>
                  <span
                    className={`badge rounded-pill ${
                      task.completed ? 'bg-success' : 'bg-warning'
                    } me-2`}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>

  );
}

export default List