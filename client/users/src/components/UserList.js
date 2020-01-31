import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
export const UserList = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:4000/api/users")
      .then(users => {
        console.log(users);
        setUserList(users.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return userList ? (
    userList.map(user => (
      <div key={user.id}>
        <h1>{user.username}</h1>
      </div>
    ))
  ) : (
    <div></div>
  );
};
