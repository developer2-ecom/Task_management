import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import React from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  console.log(document.cookie);
  const { isAuthenticated, currentUser, setCurrentUser, logout, login } =
    useContext(AuthContext);
  const [task, setTask] = useState({ text: "", taskstatus: "", error: "" });
  const [list, setToList] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(list);

    if (list.length !== 0) {
      const fetchData = async () => {
        console.log(currentUser);
        try {
          await axios
            .post(`http://localhost:3002/api/auth/myhome`, {
              list,
              email: currentUser.email,
            })
            .then((res) => {
              setCurrentUser({ ...currentUser, list: res.data.list });

              const token = res.data.token;
              console.log("token inside home", token);
            });
        } catch (err) {
          console.log("saas");
          console.log(err);
        }
      };

      fetchData();
    } else {
      if (currentUser) {
        setToList(currentUser.list);
      } else {
        let token = "";
        document.cookie.split(";").map((s) => {
          token = s.startsWith("access_token")
            ? s.substring("access_token=".length)
            : "";
        });
        if (token) {
          login({ access_token: token });
        }
      }
    }
  }, [list]);

  function handleChange(e) {
    e.preventDefault();
    if (task.text.trim() && task.taskstatus !== "") {
      setToList((list) => {
        const newList = [...list, task];
        console.log(newList);
        return newList;
      });
      setTask({ text: "", taskstatus: "", error: "" });
    } else {
      if (!task.text.trim()) {
        setTask({ ...task, error: "Enter your task" });
      } else if (task.taskstatus === "") {
        setTask({ ...task, error: "Enter your status for the task" });
      }
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <h2 style={{ marginTop: "20%" }}>Welcome, {currentUser.name}!</h2>

          <div className="TodoWrapper">
            <form className="TodoForm" onSubmit={handleChange}>
              <label htmlFor="todo-input"></label>
              <input
                type="text"
                className="todo-input"
                id="task"
                name="text"
                placeholder="Enter your task..."
                value={task.text}
                onChange={(e) => {
                  setTask({ ...task, text: e.target.value });
                }}
              />

              {/* <label htmlFor="taskstatus" className="todo-btn">select status</label> */}
              <select
                id="taskstatus"
                name="taskstatus"
                className="todo-btn"
                onChange={(e) => {
                  setTask({ ...task, taskstatus: e.target.value });
                }}
              >
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <button type="submit" className="todo-btn">
                Add
              </button>
            </form>
            {task.error && <p style={{ color: "red" }}>{task.error}</p>}
            <div>
              {Array.isArray(currentUser.list) &&
                currentUser.list.length > 0 &&
                [...currentUser.list].reverse().map((data, i) => (
                  <div className="Todo">
                    <div key={i} className="TodoTask">
                      <p className="show-task">Task: {data.text}</p>
                      <div>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "white" }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="fa-trash"
                          style={{ color: "red" }}
                        />
                      </div>
                      </div>
                      <div key={i} className="TodoStatus">
                      <p className="show-status">Status: {data.taskstatus}</p>
                      <div>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "white" }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="fa-trash"
                          style={{ color: "red" }}
                        />
                      </div>
                    
                      {/* <div className="show-status">
                        Status: {data.taskstatus}
                      </div> */}
                    </div>
                    
                      
                   
                  </div>
                ))}
            </div>
          </div>

          {/* <button onClick={logout}>Logout</button> */}
        </>
      ) : (
        <p>Please log in to see your tasks.</p>
      )}
    </>
  );
};
export default Home;
