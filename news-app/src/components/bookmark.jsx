import React, { Component } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
class Bookmark extends Component {
  state = {};

  componentDidMount() {
    if (this.props.article.id in localStorage) {
      this.setState({ isBookmarked: true });
    } else {
      this.setState({ isBookmarked: false });
    }
  }

  setBookmark = (event) => {
    const { article } = this.props;
    //event.preventDefault();
    if (this.state.isBookmarked) {
      this.setState({ isBookmarked: false });
      localStorage.removeItem(article.id);
      toast("Removing - " + article.title, {
        className: "text-dark small m-1",
      });
      //event.preventDefault();
    } else {
      this.setState({ isBookmarked: true });
      localStorage.setItem(article.id, JSON.stringify(article));
      toast("Saving " + article.title, { className: "text-dark small m-1" });
      //event.preventDefault();
    }
    event.stopPropagation();
  };

  render() {
    const { isBookmarked } = this.state;
    //console.log(this.props.article);
    const styles = {
      color: "#e3103b",
      fontSize: "1.8rem",

      cursor: "pointer",
    };
    return (
      <React.Fragment>
        {isBookmarked ? (
          <a
            style={{ marginLeft: "5rem", marginRight: "1rem" }}
            data-tip="Bookmark"
          >
            <FaBookmark
              style={styles}
              onClick={(event) => this.setBookmark(event)}
            />
          </a>
        ) : (
          <a
            style={{ marginLeft: "5rem", marginRight: "1rem" }}
            data-tip="Bookmark"
          >
            <FaRegBookmark
              style={styles}
              onClick={(event) => this.setBookmark(event)}
            />
          </a>
        )}
        <ToastContainer
          //style={{ color: "white", backgroundColor: "black" }}
          position="top-center"
          //autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
          transition={Zoom}

          //color="white"
        />
        <ReactTooltip effect="solid" trigger="hover" />
      </React.Fragment>
    );
  }
}

export default Bookmark;
