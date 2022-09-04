import React, { useState } from 'react';
import "./App.css";

export function CreateTask({ add }) {
  const [value, setValue] = useState('')

  return (
    <form
      className="form-group col-lg-12 d-flex mt-3"
      onSubmit={(e) => {
        add(value);
        setValue('');
        e.preventDefault();
      }}>
      <input
        className="form-control col-lg-8 mr-2"
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Add new Task Title" />
      <button
        className="btn btn-success w-100"
        type="button"
        onClick={() => { add(value); setValue('') }}>
        Add
      </button>
    </form>
  )
}

export default function App() {
  const [todos, setTodo] = useState([
    {
      id: 1,
      task: 'Reactjs Redux öyrenmeliyem',
      status: 'panding'
    },
    {
      id: 2,
      task: 'Mövcud saytin header da deyişiklik etmeliyem',
      status: 'panding'
    }
  ])
  const addNew = (e) => {
    if (e !== '') {
      let newTask = [...todos, { id: Math.random(), task: e, status: 'panding' }]
      setTodo(newTask)
    } else {
      alert('Zəhmət olmasa Task daxil edin')
    }
  }

  const deleteTask = (index) => {
    let newTask = [...todos]

    newTask.splice(index, 1)
    setTodo(newTask)
  }

  const done = (index) => {
    let newTask = [...todos]
    newTask[index].status = 'done'
    setTodo(newTask)

  }

  let className = 'list-group-item';
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-lg-12">
          <h3 className="p-3 text-center bg-primary text-light">My Reactjs Simply Todo App</h3>
          <ul className="list-group">
            {
              todos.map((todo, index) => {
                todo.status == 'panding' ? className = 'list-group-item' : className = 'list-group-item list-group-item-success';
                return (
                  <li className={className}
                    key={index} >
                    {todo.task}
                    <span
                      className="float-right btn btn-danger"
                      onClick={() => deleteTask(index)} >
                      sil
                    </span>
                    <span
                      className="float-right btn btn-primary mr-2"
                      onClick={() => done(index)}>
                      Done
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <CreateTask add={addNew} />
      </div>
    </div>
  )
}
