import React, { Component } from "react";
import Cards from "./cards";
// import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

class FetchArticles extends Component {
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
    //console.log("fetch");
    //console.log(newUrl);
    fetch(newUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(typeof this.state.articles);
          //console.log(result);

          this.setState({
            isLoaded: true,
            articles: result,
          });

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
    //console.log("mounted");
    this.props.setSection("home");
    let url;
    if (this.props.guardian) {
      url =
        "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/home/guardian";
    } else {
      url = "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/home/nyt";
    }
    this.fetchFromUrl(url);
  }

  componentDidUpdate(prevProps) {
    //console.log(prevProps, this.props);
    this.props.setSection("home");
    if (this.props.guardian !== prevProps.guardian) {
      let url;
      if (this.props.guardian) {
        url =
          "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/home/guardian";
      } else {
        url =
          "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/home/nyt";
      }
      if (this.state.isLoaded) {
        this.setState({ isLoaded: false });
      }
      this.fetchFromUrl(url);
    }
  }

  render() {
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
          {articles.length == 0 ? (
            <h6>You have no saved articles</h6>
          ) : (
            <Cards articles={articles} />
          )}
        </React.Fragment>
      );
    }
  }
}

export default FetchArticles;
