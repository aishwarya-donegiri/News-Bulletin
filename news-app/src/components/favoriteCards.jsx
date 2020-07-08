import React, { Component } from "react";
import FavoriteCard from "./favoriteCard";
import { ToastContainer, toast, Zoom } from "react-toastify";
class FavoriteCards extends Component {
  state = {};

  render() {
    //console.log("cards", this.state.articles);
    //console.log("cards", this.props);

    const { articles, isSearch } = this.props;
    return (
      <React.Fragment>
        {this.props.articles.length == 0 ? (
          <h6 style={{ textAlign: "center", margin: "1rem" }}>
            You have no saved articles
          </h6>
        ) : (
          <div>
            {" "}
            <h4 className="ml-4">Favorites</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {articles.map((article) => (
                <FavoriteCard
                  article={article}
                  setArticles={this.props.setArticles}
                />
              ))}
            </div>
          </div>
        )}{" "}
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
      </React.Fragment>
    );
  }
}

export default FavoriteCards;
