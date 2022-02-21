import { useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Form, Container, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLoginCheck from "../hooks/useLoginCheck";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { loggedIn, checking } = useLoginCheck();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setPassword("");
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        alert("Account not found or incorrect email");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert(error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    setUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <Container className="text-center text-success">
        {!checking && !loggedIn && (
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 mt-3"
            >
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                className="text-success"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="text-success"
              />
            </FloatingLabel>
            {!user?.email && (
              <Button className="mb-3 mt-3" variant="success" type="submit">
                Login
              </Button>
            )}
          </Form>
        )}
        {user?.email && (
          <Button className="mb-3 mt-3" variant="success" onClick={() => logout()}>
            Logout
          </Button>
        )}
        <div>{user?.email}</div>
      </Container>
    </div>
  );
};

export default LoginPage;
