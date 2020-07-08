import React, { Component } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import SearchCards from "./searchCards";

class FetchSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],

      //url: this.props.url,
    };
  }
  // state = {
  //   error: null,
  //   isLoaded: false,
  //   items: [],
  //   url: this.props.url,
  // };

  fetchFromUrl = (newUrl) => {
    //console.log("fetch function");
    //console.log(newUrl);
    fetch(newUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(typeof this.state.articles);
          //console.log(result);

          this.setState(
            {
              isLoaded: true,
              articles: result,
            },
            () => console.log(this.state.articles)
          );

          //console.log(this.state.articles[1]);
        },
        (error) => {
          console.log("Error");
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount() {
    this.props.setSection("");
    if (this.props.toggleIsVisible) {
      this.props.setToggleVisibility();
    }
    //console.log("mounted", this.props.guardian);
    let temp = this.props.location.search;
    //console.log(temp);
    let url;
    this.props.guardian
      ? (url =
          "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/guardianSearch")
      : (url =
          "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/nytSearch");
    url += temp;
    //console.log("fetch search", url);
    this.fetchFromUrl(url);
  }

  componentDidUpdate(prevProps) {
    this.props.setSection("");
    //console.log(prevProps, this.props);
    if (prevProps !== this.props) {
      //console.log("updated");
      let temp = this.props.location.search;
      //console.log(temp.substring(4, temp.length));
      let url;
      this.props.guardian
        ? (url =
            "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/guardianSearch")
        : (url =
            "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/nytSearch");
      url += temp;
      if (this.state.isLoaded) {
        this.setState({ isLoaded: false });
      }
      //console.log("fetch update", url);
      this.fetchFromUrl(url);
    }
  }

  componentWillUnmount() {
    if (!this.props.toggleIsVisible) {
      this.props.setToggleVisibility();
    }
  }

  render() {
    //console.log("render");
    //console.log("homPage", this.state);
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
            width: "100vw",
          }}
        >
          <BounceLoader css="" size="50px" color={"#325aba"} loading={true} />

          <div className="mt-1"> Loading</div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {/* <h1>fetch search</h1> */}
          <SearchCards articles={articles} />
        </React.Fragment>
      );
    }
  }
}

export default FetchSearchResults;
