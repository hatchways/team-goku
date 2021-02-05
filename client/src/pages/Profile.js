import React, { useState, useEffect } from "react";
import ChefProfile from "./ChefProfile";
import UserProfile from "./UserProfile";
import { getLogin } from "../util/LoginLogoutUtils";
import {
  useParams,
} from "react-router-dom";

 function Profile() {
  let { id } = useParams();
  console.log("the id" + id);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (id) {
      fetch("/users/" + id)
        .then((res) => res.json()) //should check if response status code 200 else return error
        .then((data) => {
          setUser(data);
        });
    } else {
      fetch("/users/" + getLogin())
        .then((res) => res.json()) //should check if response status code 200 else return error
        .then((data) => {
          setUser(data);
        });
    }
  }, []);

  return(
      <div>
        {(user.isChef) ? 
            <ChefProfile id={user._id}></ChefProfile> :
            <UserProfile id={user._id}></UserProfile>
        }
      </div>
  )
}

export default Profile;