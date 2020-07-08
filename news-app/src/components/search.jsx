import React, { Component } from "react";
import AsyncSelect from "react-select/async";
//import Select from "react-select";
import _ from "lodash";
import { withRouter } from "react-router-dom";

class Dropdown extends Component {
  state = { results: [], input: "" };

  constructor() {
    super();
    //this.handleSearch = this.handleSearch.bind(this);
    //this.getSearchOptions = _.debounce(this.getSearchOptions.bind(this), 500);
  }
  new_headers = new Headers({
    "Ocp-Apim-Subscription-Key": "76100c22a9db49a6b42b5280cf6942ee",
    Accept: "application/ld+json",
  });

  getSearchOptions = async (input, callback) => {
    if (!input) {
      return callback([]);
    }
    this.setState({ input });
    console.log(input);
    try {
      const response = await fetch(
        "https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=en-US&q=" +
          input,
        {
          headers: this.new_headers,
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map((result) => ({
        label: result.displayText,
        value: result.displayText,
      }));
      await this.setState({ results });
      //console.log(results);
      callback(results);
    } catch (e) {
      console.log(e);
    }
  };

  // promiseOptions = (inputValue) =>
  //   new Promise((resolve) => {
  //     //console.log(inputValue);
  //     resolve(this.getSearchOptions(inputValue));
  //     // setTimeout(() => {
  //     //   resolve(filterColors(inputValue));
  //     // }, 1000);
  //   });

  handleSearch = (option) => {
    //console.log("selected", option.label);
    //console.log("props", this.props);
    this.props.history.push("/search?q=" + option.value);
  };

  render() {
    //console.log(".....................", this.props.location.pathname);

    return (
      <React.Fragment>
        <div style={{ flex: 1, maxWidth: "17rem" }}>
          {this.props.location.pathname === "/search" ? (
            <AsyncSelect
              // options={this.scaryAnimals}

              cacheOptions
              loadOptions={this.getSearchOptions}
              defaultOptions
              placeholder="Enter keyword .."
              onChange={this.handleSearch}
              noOptionsMessage={() => {
                return "No Match";
              }}
            />
          ) : (
            <AsyncSelect
              // options={this.scaryAnimals}

              cacheOptions
              loadOptions={this.getSearchOptions}
              defaultOptions
              placeholder="Enter keyword .."
              onChange={this.handleSearch}
              noOptionsMessage={() => {
                return "No Match";
              }}
              value=""
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const Search = withRouter(Dropdown);
export default Search;
