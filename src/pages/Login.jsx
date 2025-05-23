import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();


  function handleLogin(e) {
        e.preventDefault(); 
        if(email && password) {
          login(email, password);
        } else {
          alert("Invalid credentials");
        }
    }

  useEffect(() => {   
      if(isAuthenticated === true) {
        navigate("/app", {replace: true});
      } 
    }, [isAuthenticated, navigate]);


  return (
    <main className={styles.login}>

      <PageNav />

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
