import React, { Component } from "react";
import Cards from "./cards";

class FetchWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      error: null,
      isLoaded: false,
      articles: [],
    };
  }

  flag = 0;

  fetchFromUrl = (newUrl) => {
    console.log("fetch");
    fetch(newUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(typeof this.state.articles);
          console.log(result);

          this.setState({
            isLoaded: true,
            articles: result,
            url: newUrl,
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

  //   setUrl = () => {
  //     console.log("setUrl");

  //     console.log(this.props.match.params.section);
  //     let url =
  //       "http://localhost:3001/tabs/guardian/" + this.props.match.params.section;
  //     console.log(url);
  //     if (!(url === this.state.url)) {
  //       console.log("url changed");
  //       return url;
  //     }
  //     //this.setState({ url });
  //   };

  componentDidMount() {
    console.log("mounted section");
    //this.setUrl();
    //console.log(this.props);
    let url;
    if (this.props.guardian) {
      url = "http://localhost:3001/tabs/guardian";
    } else {
      url = "http://localhost:3001/tabs/nyt";
    }
    url += this.props.match.path;
    console.log(url);

    this.fetchFromUrl(url);
  }

  render() {
    console.log("render", this.state);
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Cards articles={articles} />
        </React.Fragment>
      );
    }
  }
}

export default FetchWorld;
