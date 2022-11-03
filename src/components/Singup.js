import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseConfig from "../fire";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  let handleSubmit = () => {
    if (!name && !email && !password) {
      setErr("vui long nhap day du thong tin");
    } else if (!name) {
      setErr("vui long nhap Name");
    } else if (!name.trim()) {
      setErr("vui long nhap dung dinh dang");
    } else if (!email) {
      setErr("vui long nhap Email");
    } else if (!password) {
      setErr("vui long nhap Password");
    } else if (password.length <= 5) {
      setErr("vui long nhap du 6 ky tu");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnPGqX4s6HDBoVTLwIhy3fFmdxvMiDIfUtdA&usqp=CAU",
          }).then(() => {
            setErr("thanhcong");
            navigate("/");
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            setErr("Email da ton tai");
          } else {
            setErr("");
          }
        });
    }
  };
  return (
    <div id="singup" style={{ marginTop: 50 }}>
      <div className="singup">
        <h2>Create a acout</h2>

        <div class="form-group">
          <label for="exampleInputName" class="sr-only">
            Name
          </label>
          <div class="position-relative has-icon-right">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="exampleInputName"
              placeholder="Enter Your Name"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="exampleInputEmailId" class="sr-only">
            Email ID
          </label>
          <div class="position-relative has-icon-right">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              id="exampleInputEmailId"
              placeholder="Enter Your Email ID"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword" class="sr-only">
            Password
          </label>
          <div class="position-relative has-icon-right">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="Password"
              id="exampleInputPassword"
              placeholder="Choose Password"
            />
          </div>
        </div>
        <p>{err}</p>
        <div class="form-group">
          <div class="icheck-material-white">
            <input type="checkbox" id="user-checkbox" checked="" />
            <label for="user-checkbox">I Agree With Terms & Conditions</label>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-light btn-block waves-effect waves-light"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <div class="form-row mt-4">
          <div class="form-group mb-0 col-6">
            <button type="button" class="btn btn-light btn-block">
              <i class="fa fa-facebook-square"></i> Facebook
            </button>
          </div>
          <div class="form-group mb-0 col-6 text-right">
            <button type="button" class="btn btn-light btn-block">
              <i class="fa fa-twitter-square"></i> Twitter
            </button>
          </div>
        </div>
        <Link to="/signin">You have already accout? Singin</Link>
      </div>
    </div>
  );
};

export default Singup;
