import React, { Component } from "react";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/navBar";
import "./App.css";
//import HomePage from "./components/homePage";
import Content from "./components/content";
import smoothscroll from "smoothscroll-polyfill";
import ReactTooltip from "react-tooltip";
class App extends Component {
  state = {
    toggleIsVisible: true,
    guardian: localStorage.getItem("guardian") === "true",
    section: "",
  };

  setSection = (section) => {
    //console.log("section", section);
    if (this.state.section !== section) {
      this.setState({ section });
    }
  };

  componentDidMount() {}

  setToggle = () => {
    //console.log("toggled");

    //window.scroll({ top: 0, left: 0, behavior: "smooth" });
    let guardian;
    this.state.guardian ? (guardian = false) : (guardian = true);
    this.setState({ guardian }, () => {
      localStorage.setItem("guardian", this.state.guardian);
    });
    //smoothscroll.polyfill();
    //console.log(this.state.guardian);
  };

  setToggleVisibility = () => {
    //console.log("deactivated");

    let toggleIsVisible;
    this.state.toggleIsVisible
      ? (toggleIsVisible = false)
      : (toggleIsVisible = true);
    this.setState({ toggleIsVisible });
  };

  render() {
    //smoothscroll.polyfill();
    //console.log(this.state.url);
    return (
      <React.Fragment>
        <NavigationBar
          //style={{ scroll: "smooth" }}
          test={this.test}
          guardian={this.state.guardian}
          setToggle={this.setToggle}
          toggleIsVisible={this.state.toggleIsVisible}
          section={this.state.section}
        />
        <Content
          //style={{ scroll: "smooth" }}
          guardian={this.state.guardian}
          setToggleVisibility={this.setToggleVisibility}
          toggleIsVisible={this.state.toggleIsVisible}
          setSection={this.setSection}
        />
        <ReactTooltip effect="solid" trigger="hover" />
      </React.Fragment>
    );
  }
}

export default App;
