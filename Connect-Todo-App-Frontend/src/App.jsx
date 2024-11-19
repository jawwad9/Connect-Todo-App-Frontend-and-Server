import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const title = useRef();
  const [data, setData] = useState(null);

  // all users with server api
  useEffect(() => {
    axios('http://localhost:3000/users')
    .then((res) => {
      console.log(res.data);
      setData(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  },[]);

  // add a user with server api
  const addTodo = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user',{ title: title.current.value,});
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete a user with server api
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/user/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // edit user with server api
  const editTodo = async (id) => {
    const updateUser = prompt("Enter User");
    try {
      const res = await axios.put(`http://localhost:3000/user/${id}`,{ title: updateUser})
      console.log(res.data);      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>Todo App</div>
    <form onClick={addTodo}>
      <input type="text" name="title" placeholder="Enter Todo Title" ref={title}/>
      <button type='sumbit'>Add</button>

      {data && data.length > 0 ? (
        data.map((item) => {
          return <div key={item.id}>
            <h1>{item.title}</h1>
            <button onClick={()=> deleteTodo(item.id)} >Delete</button>
            <button onClick={()=> editTodo(item.id)} >Edit</button>
          </div>
        })
      ) : (<h1>No data found</h1>)}

    </form>
    </>
  )
}

export default App