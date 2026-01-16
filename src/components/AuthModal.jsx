import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser, signupUser } from "../features/auth/authSlice";

export default function AuthModal({ show, onHide }) {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((s) => s.auth);

  const [isSignup, setIsSignup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // Close modal automatically when login/signup succeeds
  useEffect(() => {
    if (token && show) {
      onHide();
    }
  }, [token, show, onHide]);

  const submit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signupUser({ ...form, isAdmin }));
    } else {
      dispatch(loginUser(form));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? "Sign Up" : "Login"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </Form.Group>

          {isSignup && (
            <Form.Check
              type="switch"
              label="Register as Admin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="mb-3"
            />
          )}

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account?" : "Create account"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
