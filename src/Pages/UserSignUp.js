import classes from "../components/MainHeader/MainHeader.module.css";
import Signup from "../components/Signup";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/UI/Button/Button";

const UserSignUp = () => {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const userAlert = () => {
    Swal.fire({
      text: "Account created successfully",
      icon: "success",
      confirmButtonText: "Continue to Login",
    }).then(() => {
      navigate("/user/login");
    });
  };

 const addUserHandler = (userData) => {
  console.log('Starting addUserHandler');
  axios
    .post(`https://chatbox-project-final.onrender.com/user/signup`, userData)
    .then((result) => {
      console.log('Request successful', result);
      if (result.status === 200) {
        userAlert();
      } else {
        navigate("");
      }
    })
    .catch((error) => {
      console.error('Error in addUserHandler', error);
      setError(error.response?.data || { message: 'An error occurred' });
    });
};

  return (
    <>
      <header className={classes["main-header"]}>
        <h3>User Sign Up</h3>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </header>
      <Signup error={error?.message} addUser={addUserHandler} />
    </>
  );
};

export default UserSignUp;
