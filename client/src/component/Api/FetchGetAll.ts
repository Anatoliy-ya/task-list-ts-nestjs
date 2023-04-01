import { API } from "./Api";

const fetchGetAll = async (): Promise<void> => {
  await fetch(API, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return console.log(data);
    });
};

export const getAll = fetchGetAll();
