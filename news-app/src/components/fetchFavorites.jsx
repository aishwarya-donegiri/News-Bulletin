import React, { Component } from "react";
import FavoriteCards from "./favoriteCards";

class FetchFavorites extends Component {
  state = { articles: [] };

  componentWillUnmount() {
    if (!this.props.toggleIsVisible) {
      this.props.setToggleVisibility();
    }
  }
  componentDidMount() {
    this.props.setSection("");
    if (this.props.toggleIsVisible) {
      this.props.setToggleVisibility();
    }
    const items = { ...localStorage };
    //console.log(items);
    delete items.guardian;
    const temp = Object.values(items);
    let articles = [];
    temp.map((article) => articles.push(JSON.parse(article)));
    this.setState({ articles });
  }

  setArticles = (id) => {
    const articles = this.state.articles.filter((i) => i.id !== id);
    //console.log(articles);
    this.setState({ articles });
  };
  render() {
    //console.log("////", articles);

    return (
      <React.Fragment>
        <FavoriteCards
          articles={this.state.articles}
          setArticles={this.setArticles}
          setToggleVisibility={this.props.setToggleVisibility}
          toggleIsVisible={this.props.toggleIsVisible}
        />
      </React.Fragment>
    );
  }
}

export default FetchFavorites;
