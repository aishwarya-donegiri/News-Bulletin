import React, { Component } from "react";
import Cards from "./cards";
import BounceLoader from "react-spinners/BounceLoader";

class FetchArticlesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],
    };
  }

  flag = 0;

  fetchFromUrl = (newUrl) => {
    //console.log("fetch");
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

  setUrl = () => {
    //console.log("setUrl");

    this.props.setSection(this.props.match.params.section);
    let url;
    if (this.props.guardian) {
      url =
        "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/tabs/guardian/";
      this.props.match.params.section === "sports"
        ? (url += "sport")
        : (url += this.props.match.params.section);
    } else {
      url =
        "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/tabs/nyt/" +
        this.props.match.params.section;
    }

    //console.log(url);
    return url;
    //this.setState({ url });
  };

  componentDidMount() {
    //console.log("mounted", this.props);
    //this.setUrl();
    this.fetchFromUrl(this.setUrl());
  }

  componentDidUpdate(prevProps) {
    //console.log(prevProps, this.props);

    if (this.props !== prevProps) {
      if (this.state.isLoaded) {
        this.setState({ isLoaded: false });
      }
      //console.log("updated");
      this.fetchFromUrl(this.setUrl());
    }
  }

  render() {
    //this.componentDidUpdate()
    //console.log("homPage", this.props.url);\
    // if (this.flag >= 5) {
    //   this.flag = 0;
    // }

    // this.flag++;
    // console.log(this.flag, "flag");
    //console.log("render", this.state);
    //console.log("render");
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      //console.log("is loading");
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

          <div> Loading</div>
        </div>
      );
    } else {
      //console.log("here");
      return (
        <React.Fragment>
          <Cards articles={articles} />
        </React.Fragment>
      );
    }
  }
}

export default FetchArticlesSection;
