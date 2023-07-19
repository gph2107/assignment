import React, { useState } from "react";
import "./app.css"; // CSS styles
import { Login } from "./Login";

// User management
const defaultUsers = [
  { username: "UserA", password: "passwordA" },
  { username: "UserB", password: "passwordB" }
];

export default function App() {
  const [users, setUsers] = useState(defaultUsers);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [linkDisable, setLinkDisable] = useState(true)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  // Help link
  const disableHelpLink = () => {
    setIsSignUpVisible(false);
    setLinkDisable(false)
  };

  // Login validation
  const login = () => {
    const user = users.find((user) => user.username === username);

    if (!user) {
      setErrorMessage("User does not exist. Please sign up.");
      return;
    }

    if (user.password !== password) {
      setErrorMessage("Incorrect password entered. Please try again.");
      return;
    }

    // Perform successful login action
    console.log("Logged in successfully!");
  };

  // Sign up
  const signUp = () => {
    setUsers([...users, newUser]);
  console.log(users)
    // Perform successful sign-up action
    setIsLoggedIn(true)
    console.log("User signed up successfully!");
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            disableHelpLink()
          }}
        // onFocus={disableHelpLink}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={disableHelpLink}
        />
        <button onClick={login}>Login</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="signup-link">
          <button onClick={() => setIsSignUpVisible(!isSignUpVisible)}>
            Create an account
          </button>
          {
            linkDisable &&
            <button>
              Need help
            </button>
          }
        </div>
        {isSignUpVisible && (
          <div className="signup-form">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Email ID"
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <button onClick={signUp}>Submit</button>
          </div>
        )}
      </div>
      <div className="password-toggle">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label>Show Password</label>
      </div>
    </div>
  );
}
