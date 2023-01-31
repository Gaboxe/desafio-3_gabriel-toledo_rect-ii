import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function MyNavbar() {
    const setActiveClass = ({ isActive }) => (isActive ? "nav_active" : "nav_dont_active");

    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Poke</Navbar.Brand>

                    <Nav className="ms-auto">
                        <Nav.Item>
                            <NavLink className={setActiveClass} to="/"> Home </NavLink>
                        </Nav.Item>
                        <Nav.Item className="ms-4">
                            <NavLink className={setActiveClass} to="/pokemones"> Pokemones </NavLink>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}