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
  const [task, setTask] = useState({ title: "", description: "", status: "" });
  const[error, setError] = useState("");
  const [list, setToList] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(list);
    if (list.length !== 0) {
      const fetchData = async () => {
        console.log(".............",currentUser);
        try {
          await axios
            .post(`http://localhost:3001/loginUserTask`, {
              title: task.title,
              description: task.description,
              status: task.status,
              email: currentUser.email,
            })
            .then((res) => {
              console.log("hiiiiiiii")
              setCurrentUser({ ...currentUser, list: res.data.loginUserTask});
              console.log("/////////",res.data.loginUserTask)

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

  console.log(list)
  function handleChange(e) {
    e.preventDefault();
    if (task.title.trim() && task.status !== "" && task.description.trim()) {
      setToList((list) => {
        const newList = [...list, task];
        console.log("list",newList);
        return newList;
      });
      setTask({ title: "", description: "",status: "" });
    } else {
       if (!task.title.trim()) {
        setTask(task)
        setError("Enter your title for the task");
      }else if (!task.description.trim()) {
        setTask(task)
        setError("Enter your description for the task");
      }
      else if (task.status === "") {
        setTask(task);
        setError("Enter your status for the task")
      }
    }
  }


  const handleUpdate = async()=>{

    try{
      const res = await axios.post(`http://localhost:3001/taskUpdate`, {
        
      })
    }catch(err){

    }
  }

  const displayTask = async()=>{

    try{
      const res = await axios.post(`http://localhost:3001/taskDisplay`, {
        
      })
    }catch(err){

    }
  }

 const handleDelete=async(taskId)=>{
    console.log("del is clicked for")
    try{
      const res = await axios.post(`http://localhost:3001/taskDelete`, {
              email: currentUser.email,
              taskId,
            })
           
            setTimeout(()=>{
              if(res.data && res.data.list){
                setToList(res.data.list)
                setCurrentUser((prevUser)=>(
                  {
                    ...prevUser,
                    list: res.data.list,
              }
              
                ))
              }
              console.log("delete task response list", res.data.list)
            }, 1000)
            
           
    }catch(err){
      console.log("Error in deleting task",err)
    }
  }

  return (
    <>

      {isAuthenticated ? (
        <>
          <div className="outer">
            <div className="TodoWrapper">
              <h2
                style={{ marginTop: "8%", marginBottom: "4%", color: "white" }}
              >
                Welcome, {currentUser.name}!
              </h2>
              <form className="TodoForm" onSubmit={handleChange}>
                <label htmlFor="todo-input"></label>
                <input
                  type="text"
                  className="todo-input"
                  id="task"
                  name="title"
                  placeholder="Enter your task..."
                  value={task.title}
                  onChange={(e) => {
                    setTask({ ...task, title: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="todo-input"
                  id="task"
                  name="decription"
                  placeholder="Enter description..."
                  value={task.description}
                  onChange={(e) => {
                    setTask({ ...task, description: e.target.value });
                  }}
                />

                <select
                  id="status"
                  name="status"
                  className="todo-btn"
                  defaultValue={"default"}
                  onChange={(e) => {
                    setTask({ ...task, status: e.target.value });
                  }}
                >
                  <option value="default" disabled>
                    Select Status
                  </option>
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
                {Array.isArray(currentUser.list) && currentUser.list.length > 0 &&
                [ ...currentUser.list].map((data, i) => (
                    <div key={i} className="Todo">
                      <div className="TodoTask">
                        <p className="show-task">Task: {data.title}</p>
                        <div>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "white" }}
                          
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="fa-trash"
                            style={{ color: "red" }}
                            onClick={()=>handleDelete(data._id)}
                          />
                        </div>
                      </div>
                      <div className="TodoStatus">
                        <p className="show-status">Status: {data.status}</p>
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
                    </div>
                  ))}
              </div>
            </div>

            {/* <button onClick={logout}>Logout</button> */}
          </div>
        </>
      ) : (
        <p>Please log in to see your tasks.</p>
      )}
    </>
  );
};

export default Home;
