import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import Search from "./search";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Switch from "react-switch";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

//import Searchbar from "./searchBar";

//import FetchArticles from "./fetchArticles";
//import Test from "./test";

class NavigationBar extends Component {
  state = {
    bookmarkIsActive: false,
  };

  handleBookmarkActive = () => {
    if (this.state.bookmarkIsActive) {
      this.setState({
        bookmarkIsActive: false,
      });
    }
  };

  handleBookmarkInactive = () => {
    if (!this.state.bookmarkIsActive) {
      this.setState({
        bookmarkIsActive: true,
      });
    }
  };

  render() {
    //smoothscroll.polyfill();
    //console.log(this.props);
    const styles = {
      backgroundImage: "linear-gradient(to right, #1e2a44, #516bb2)",
      verticalAlign: "middle",
    };

    const toggleStyle = {
      fontSize: "large",
      color: "#f8f9fa",

      //margin: "0 10px 0 10px",
    };

    //console.log(this.state.url);
    return (
      <React.Fragment>
        <Navbar style={styles} collapseOnSelect expand="lg" variant="dark">
          <Search />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                as={Link}
                to="/"
                onClick={this.handleBookmarkActive}
                className={this.props.section === "home" ? "active" : null}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={this.props.section === "world" ? "active" : null}
                as={Link}
                to="world"
                onClick={this.handleBookmarkActive}
              >
                World
              </Nav.Link>
              <Nav.Link
                className={this.props.section === "politics" ? "active" : null}
                as={Link}
                to="politics"
                onClick={this.handleBookmarkActive}
              >
                Politics
              </Nav.Link>
              <Nav.Link
                className={this.props.section === "business" ? "active" : null}
                as={Link}
                to="business"
                onClick={this.handleBookmarkActive}
              >
                Business
              </Nav.Link>
              <Nav.Link
                className={
                  this.props.section === "technology" ? "active" : null
                }
                as={Link}
                to="technology"
                onClick={this.handleBookmarkActive}
              >
                Technology
              </Nav.Link>
              <Nav.Link
                className={this.props.section === "sports" ? "active" : null}
                as={Link}
                to="sports"
                onClick={this.handleBookmarkActive}
              >
                Sports
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                as={Link}
                to="favorites"
                onClick={this.handleBookmarkInactive}
                className="mr-2"
              >
                {this.state.bookmarkIsActive ? (
                  <FaBookmark data-tip="Bookmark" style={toggleStyle} />
                ) : (
                  <FaRegBookmark data-tip="Bookmark" style={toggleStyle} />
                )}
              </Nav.Link>
            </Nav>
            {this.props.toggleIsVisible ? (
              <Nav>
                <Navbar.Text className="mr-2" style={toggleStyle}>
                  NYTimes
                </Navbar.Text>
                <Navbar.Text className="mr-2">
                  <Switch
                    //style={{ margin: "10px" }}
                    className="react-switch"
                    checked={this.props.guardian}
                    onChange={this.props.setToggle}
                    onColor="#4696ec"
                    offColor="#dddddd"
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </Navbar.Text>

                <Navbar.Text style={toggleStyle}>Guardian</Navbar.Text>
              </Nav>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavigationBar;
