/* eslint-disable no-script-url */
import React, { useState } from "react";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Singin = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  let handleSubmit = () => {
    if (!email && !password) {
      setErr("vui long nhap day du thong tin");
    } else if (!email) {
      setErr("vui long nhap Email");
    } else if (!password) {
      setErr("vui long nhap Password");
    } else if (password.length <= 7) {
      setErr("vui long nhap du 6 ky tu");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setErr("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            setErr("Nhap sai passWord");
          } else if (error.code === "auth/user-not-found") {
            setErr("Nhap sai Email");
          } else {
            setErr("");
          }
        });
    }
  };
  return (
    <div id="singup" style={{ marginTop: 50 }}>
      <div className="singup">
        <h2>Login your account</h2>
        <div class="position-relative has-icon-right">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="Email"
            id="exampleInputUsername"
            placeholder="Enter Username"
          />
        </div>
        <div class="position-relative has-icon-right">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="Password"
            id="exampleInputPassword"
            placeholder="Enter Password"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <div class="icheck-material-white" style={{ float: "left" }}>
              <input type="checkbox" id="user-checkbox" checked="" />
              <label for="user-checkbox">Remember me</label>
            </div>
          </div>
          <div class="form-group col-6 text-right">
            <a href="reset-password.html">Reset Password</a>
          </div>
        </div>
        <>{err}</>
        <button
          onClick={handleSubmit}
          type="button"
          class="btn btn-light btn-block"
        >
          Sign In
        </button>
        <div class="text-center mt-3">Sign In With</div>
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
      </div>
    </div>
  );
};

export default Singin;
