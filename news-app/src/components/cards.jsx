import React, { Component } from "react";
import ResultCard from "./resultCard";

class Cards extends Component {
  state = {};
  render() {
    //console.log("cards", this.state.articles);
    //console.log("cards", this.props);
    const { articles, isSearch } = this.props;
    return (
      <React.Fragment>
        {articles.map((article) => (
          <ResultCard article={article} />
        ))}
      </React.Fragment>
    );
  }
}

export default Cards;
