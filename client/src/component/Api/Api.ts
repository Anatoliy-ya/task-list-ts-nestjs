import axios from "axios";

export const API = "http://localhost:3300/tasks";

export const axiosClassic = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAll = async () => {
  const todos = await axios.get(API);
  console.log(todos.data);
};

// const fetchApi = async (api = '') => {
//   await fetch(api, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({
//       task: 'Task APP',
//       description: 'string',
//       checker: true,
//       date: Date,
//     }), // body data type must match "Content-Type" header
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return console.log(data);
//     });
// };

// fetchApi(API);
