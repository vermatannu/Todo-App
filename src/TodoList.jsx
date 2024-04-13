import "./TodoList.css"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {

    let [todos, setTodos] = useState([{ task: "sample Task", id: uuidv4(), isDone: false }])
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }]
        })
        setNewTodo("");
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    let markAllDone = () => {
        setTodos(
            todos.map((todo) => {
                return {
                    ...todo, isDone: true
                }
            })
        )
    }

    let markAsDone = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo, isDone: true
                    };
                } else {
                    return todo;
                }
            })
        )
    }

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <div className="input-container">
                <input 
                    className="todo-input" 
                    placeholder="Add a Task" 
                    value={newTodo} 
                    onChange={updateTodoValue} 
                />
                <button className="add-button" onClick={addNewTask}>Add Task</button>
            </div>
            <hr className="divider" />
            
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.isDone ? "todo-item done" : "todo-item"}>
                        <span>{todo.task}</span>
                        <div className="button-container">
                            <button className="todo-button delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button className="todo-button mark-button" onClick={() => markAsDone(todo.id)}>Mark as Done</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="mark-all-button" onClick={markAllDone}>Mark All as Done</button>
        </div>
    );
}

