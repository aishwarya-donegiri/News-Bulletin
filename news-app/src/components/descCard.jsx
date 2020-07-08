import React, { Component } from "react";
import { Card } from "react-bootstrap";

import LinesEllipsis from "react-lines-ellipsis";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import Comments from "./comments";
import BounceLoader from "react-spinners/BounceLoader";
import Bookmark from "./bookmark";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
import {
  FacebookIcon,
  TwitterIcon,
  EmailShareButton as Mail,
  EmailIcon,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import ReadMore from "./readMore";

class DescriptionCard extends Component {
  state = {
    show: false,
    isExpanded: false,
    showExpandIcon: false,
    //setShow: false,
  };

  handleClose = () => {
    let show = false;
    this.setState({ show });
  };

  handleShow = () => {
    let show = true;
    //console.log("show");
    this.setState({ show });
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      article: {},
      //url: this.props.url,
    };
  }
  state = {
    error: null,
    isLoaded: false,
    article: {},
    isExpanded: false,
  };

  fetchFromUrl = (newUrl) => {
    //console.log(newUrl);
    //console.log("here");
    fetch(newUrl)
      .then((res) => res.json())
      .then((result) => {
        //console.log(typeof this.state.articles);
        //console.log(result);

        this.setState({
          isLoaded: true,
          article: result,
        });

        //console.log(this.state.articles[1]);
      })
      .then(() => {
        try {
          var ellipseText = document
            .getElementsByClassName("LinesEllipsis")[0]
            .innerHTML.split("<wbr>")[0];
        } catch (e) {
          console.log(e);
        }
        //console.log(ellipseText);
        //console.log(this.state.article.desc);
        if (ellipseText !== this.state.article.desc)
          this.setState({ showExpandIcon: true });
      });
  };

  componentDidMount() {
    if (this.props.toggleIsVisible) {
      this.props.setToggleVisibility();
    }
    //console.log("mounted", this.props.guardian);
    let temp = this.props.location.search;
    //console.log("temp", temp);

    //console.log(temp.substring(4, temp.length));
    let url;
    //const guardian = localStorage.getItem("guardian") === "true";
    temp[4] !== "h"
      ? (url =
          "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/guardianArticle?id=")
      : (url =
          "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/nytArticle?id=");
    url += temp.substring(4, temp.length);
    //console.log(url);
    this.fetchFromUrl(url);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     //console.log("updated");
  //     let temp = this.props.location.search;
  //     //console.log(temp.substring(4, temp.length));
  //     let url;
  //     temp[4] !== "h"
  //       ? (url =
  //           "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/guardianArticle?id=")
  //       : (url =
  //           "http://reactapp4640782493.us-east-1.elasticbeanstalk.com/nytArticle?id=");
  //     url += temp.substring(4, temp.length);
  //     //console.log(url);
  //     this.fetchFromUrl(url);
  //   }
  // }

  componentWillUnmount() {
    if (!this.props.toggleIsVisible) {
      this.props.setToggleVisibility();
    }
  }

  setExpanded = () => {
    this.state.isExpanded
      ? this.setState({ isExpanded: false })
      : this.setState({ isExpanded: true });
  };

  dismissToast = () => {
    //console.log("toast");
    toast.dismiss();
  };
  render() {
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

          <div> Loading</div>
        </div>
      );
    } else {
      const { article, show } = this.state;
      const id = article.id;
      const title = article.title;
      const guardian = article.isGuardian;
      //console.log(guardian);
      let image;
      if (guardian) {
        //console.log("guardian image");
        image = article.image;
      } else {
        let temp_url = article.image;
        //console.log(temp_url);
        {
          temp_url[0] !== "h"
            ? (image = "https://www.nytimes.com/" + temp_url)
            : (image = temp_url);
        }
      }

      const date = article.date;

      let fullDesc = article.desc;
      let listOfSentences = fullDesc.split(". ");
      let desc = listOfSentences[0];
      for (let i = 1; i < listOfSentences.length; i++) {
        if (i >= 4) {
          break;
        } else {
          desc += ". " + listOfSentences[i];
        }
      }
      desc += "...";
      const shareUrl = article.shareUrl;

      const cardTitle = {
        fontSize: "2 rem",
        fontWeight: 525,
      };

      const dateStyle = {
        //fontSize: "1.2rem",
        width: "auto",
        float: "left",
        marginLeft: "1%",
        //fontWeight: 510,
      };
      return (
        <React.Fragment>
          <Card
            className="m-3 shadow"
            style={{ cursor: "pointer" }}
            onClick={this.dismissToast}
          >
            <Card.Body>
              <Card.Title style={cardTitle} className="font-italic ">
                <h3>{title}</h3>
              </Card.Title>
              <Card.Text style={dateStyle} className="font-italic">
                <h5>{date}</h5>
              </Card.Text>
              <div
                style={{
                  float: "right",
                  display: "inline-block",
                }}
              >
                <a
                  href={
                    "http://www.facebook.com/share.php?u=" +
                    shareUrl +
                    "&hashtag=%23CSCI_571_NewsApp"
                  }
                  hashtag="#CSCI"
                  target="_blank"
                  style={{ display: "inline-block" }}
                  data-tip="Facebook"
                >
                  <FacebookIcon size="2rem" round="true" />
                </a>
                <a
                  href={
                    "https://twitter.com/intent/tweet?url=" +
                    shareUrl +
                    "&hashtags=CSCI_571_NewsApp"
                  }
                  target="_blank"
                  style={{ display: "inline-block" }}
                  data-tip="Twitter"
                >
                  <TwitterIcon size="2rem" round="true" />
                </a>
                <Mail
                  style={{ display: "inline-block" }}
                  url={shareUrl}
                  subject="#CSCI_571_NewsApp"
                  data-tip="Email"
                >
                  <EmailIcon size="2rem" round="true" />
                </Mail>
                <Bookmark article={article} />
              </div>
              <Card.Img
                className="img-fluid "
                style={{ align: "center" }}
                src={image}
              />
              <div>
                <Card.Text style={{ fontSize: "1rem" }} className="mt-2">
                  {/* <ReadMore children={desc} /> */}
                  <div>
                    {this.state.isExpanded ? (
                      fullDesc
                    ) : (
                      <LinesEllipsis
                        style={{ justifyContent: "space-between" }}
                        text={fullDesc}
                        maxLine={6}
                        ellipsis="..."
                        trimRight
                        basedOn="words"
                        style={{ whiteSpace: "pre-wrap" }}
                      />
                    )}
                  </div>
                  {/* {listOfSentences.length > 4
                    ? this.state.isExpanded
                      ? fullDesc
                      : desc
                    : fullDesc} */}
                </Card.Text>
                {/* <a
                  style={{ cursor: "pointer", float: "right" }}
                  onClick={this.setExpanded}
                > */}
                {this.state.showExpandIcon ? (
                  <div
                    onClick={this.setExpanded}
                    style={{ cursor: "pointer", float: "right" }}
                  >
                    {this.state.isExpanded ? (
                      <MdExpandLess size="32px" />
                    ) : (
                      <MdExpandMore size="32px" />
                    )}
                  </div>
                ) : null}
                {/* {listOfSentences.length > 4 ? (
                    this.state.isExpanded ? (
                      <MdExpandLess size="32px" />
                    ) : (
                      <MdExpandMore size="32px" />
                    )
                  ) : (
                    ""
                  )} */}
                {/* </a> */}
              </div>
            </Card.Body>

            {/* <Truncate
            lines={3}
            ellipsis={
              <span>
                ... <a href="#">Read more</a>
              </span>
            }
          >
            {desc}
          </Truncate> */}
          </Card>
          <Comments id={id} />
        </React.Fragment>
      );
    }
  }
}

export default DescriptionCard;
