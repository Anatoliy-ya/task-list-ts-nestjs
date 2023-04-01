import axios from "axios";
import { TODO_LIST } from "../../Todo_list_types";
import { API } from "./Api";

export const fetchPost = async (data: TODO_LIST) => {
  await axios.post(API);
};

// export const fetchPost = async (data: TODO_LIST) => {
//   await fetch(API, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return console.log(data);
//     });
// };
