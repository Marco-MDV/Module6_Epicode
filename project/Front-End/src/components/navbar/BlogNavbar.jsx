import React, { useState } from "react";
import { Button, Container, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
const NavBar = props => {
  const [input, setInput] = useState('')
  const [showList, setShowList] = useState(true)
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap ">
          <div className="d-flex justify-content-center align-items-stretch">
            <input type="search" name="" id="" className="border rounded-2 rounded-end-0" onChange={(e) => setInput(e.target.value)} />
            <Link to="/search"><button className="btn btn-dark rounded-start-0 " type='button' onClick={() => props.seach(input)}>Search</button></Link>
          </div>
          <Dropdown className=" d-md-none">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Button as={Link} to="/new" className="blog-navbar-add-button bg-transparent text-dark border-0" size="small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
                Nuovo Articolo
              </Button>
              <Button as={Link} to="/registration" className="blog-navbar-add-button bg-transparent text-dark border-0" size="small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
                registration
              </Button>
              <Button as={Link} to="/changeAvatarAuthor" className="blog-navbar-add-button bg-transparent text-dark border-0" size="small ">Mod Avatar</Button>
              <Button as={Link} to="/changeCoverPosts" className="blog-navbar-add-button bg-transparent text-dark border-0" size="small ">Mod Cover</Button>
              <Button as={Link} to='/login' className="blog-navbar-add-button bg-transparent text-dark border-0" size="small ">Login</Button>
            </Dropdown.Menu>
          </Dropdown>
          <div className="d-none d-md-flex justify-content-center align-items-center gap-2 flex-column flex-md-row flex-wrap">
            <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Nuovo Articolo
            </Button>
            <Button as={Link} to="/registration" className="blog-navbar-add-button bg-dark" size="small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              registration
            </Button>
            <Button as={Link} to="/changeAvatarAuthor" className="blog-navbar-add-button bg-dark" size="small ">Mod Avatar</Button>
            <Button as={Link} to="/changeCoverPosts" className="blog-navbar-add-button bg-dark" size="small ">Mod Cover</Button>
            <Button as={Link} to='/login' className="blog-navbar-add-button bg-dark" size="small ">Login</Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
