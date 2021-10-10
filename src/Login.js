import React from "react";
import classes from "./Login.module.css";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginHandler,
    signupHandler,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className={classes.login}>
      <div className={classes.loginContainer}>
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className={classes.errorMsg}>{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={classes.errorMsg}>{passwordError}</p>
        <div className={classes.btnContainer}>
          {hasAccount ? (
            <>
              <button onClick={loginHandler}>Sign In</button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={signupHandler}>Sign Up</button>
              <p>
                Have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
