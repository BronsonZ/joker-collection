import React from "react";
import { useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Form, Container, Button } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message)
    }
    setEmail("");
    setPassword("");
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
      <Container className="text-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3 mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          {!user?.email && (
            <Button className="mb-3" variant="dark" type="submit">
              Login
            </Button>
          )}
          {user?.email && (
            <Button className="mb-3" variant="dark" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Form>
        <div>{user?.email}</div>
      </Container>
    </div>
  );
};

export default LoginPage;
