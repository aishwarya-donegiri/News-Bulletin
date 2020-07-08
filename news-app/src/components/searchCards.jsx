import React, { Component } from "react";

import SearchCard from "./searchCard";

class SearchCards extends Component {
  state = {};
  render() {
    //console.log("cards", this.state.articles);
    //console.log("cards", this.props);
    const { articles, isSearch } = this.props;
    return (
      <React.Fragment>
        <h4 className="ml-4">Results</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",

            //alignContent: "center",
            //justifyContent: "space-around",
          }}
        >
          {articles.map((article) => (
            <SearchCard article={article} />
          ))}
          {/* {articles.map((article) => (
          <ResultCard article={article} />
        ))} */}
          {/* <ResultCard article={this.state.articles[0]} /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchCards;
