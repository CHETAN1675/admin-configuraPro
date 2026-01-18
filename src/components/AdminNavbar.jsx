import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/logo.png";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img src={logo} width="40" height="40" alt="Admin" />
          <strong>ConfiguraPro Admin</strong>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/">
              Dashboard
            </Nav.Link>

            {token && (
              <>
                <Nav.Link as={NavLink} to="/products">
                  Products
                </Nav.Link>

                <Nav.Link as={NavLink} to="/orders">
                  Orders
                </Nav.Link>

                <Nav.Link onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
