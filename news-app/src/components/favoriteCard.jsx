import React, { Component } from "react";
import { Card, Badge, Modal } from "react-bootstrap";
import LinesEllipsis from "react-lines-ellipsis";

import { Link } from "react-router-dom";
import FacebookModal from "./facebookModal";
import TwitterModal from "./twitterModal";
import MailModal from "./mailModal";
import { IoMdShare } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FavoriteCard extends Component {
  state = {
    show: false,
    //setShow: false,
  };

  dict = {
    world: "7c4eff",
    politics: "419488",
    business: "4696ec",
    technology: "cedc39",
    sport: "f6c244",
    sports: "f6c244",
    guardian: "14284a",
    nytimes: "dddddd",
    other: "6e757c",
  };

  badgeTextColor = {
    world: "white",
    politics: "white",
    business: "white",
    technology: "black",
    sport: "black",
    sports: "black",
    guardian: "white",
    nytimes: "black",
    other: "white",
  };

  handleClose = () => {
    let show = false;
    this.setState({ show });
  };

  handleShow = (event) => {
    let show = true;
    console.log("show");
    this.setState({ show });
    // event.stopPropagation();
    event.preventDefault();
  };

  getColor = (section) => {
    //console.log(this.dict[section]);
    if (!this.dict[section]) {
      return this.dict["other"];
    }
    return this.dict[section];
  };

  handleDelete = (event) => {
    localStorage.removeItem(this.props.article.id);
    event.preventDefault();
    this.props.setArticles(this.props.article.id);
    toast("Removing - " + this.props.article.title, {
      className: "text-dark small m-1",
    });
  };

  render() {
    //console.log("card", this.props);
    const { article, show } = this.props;
    const id = article.id;
    let title_temp = article.title;
    let listOfWords = title_temp.split(" ");
    //console.log(listOfWords);
    let title = listOfWords[0];
    let count = 1;
    for (let i = 1; i < listOfWords.length; i++) {
      //console.log(count);
      if (count > 9) {
        break;
      } else {
        title += " " + listOfWords[i];
        count += 1;
      }
    }

    //console.log(title);
    let image;
    if (this.props.guardian) {
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

    //console.log(temp[temp.length - 1].file, "image");
    const section = article.section.toLowerCase();
    const color = this.getColor(section);

    //console.log(color);
    const date = article.date;
    const desc = article.desc;
    const shareUrl = article.shareUrl;
    let source;
    article.isGuardian ? (source = "guardian") : (source = "nytimes");
    const sourceColor = this.getColor(source);
    // console.log(image);
    // console.log(article);
    const styles = {
      //width: "100%",
      height: "auto",
      //objectFit: "fill",
      //float: "left",
    };

    const cardTitle = {
      fontSize: "1rem",
      fontWeight: 525,
    };

    const dateStyle = {
      //fontSize: "0.8rem",
      //width: "auto",
      float: "left",
    };
    return (
      <React.Fragment>
        <Link
          to={"/article?id=" + id}
          style={{ textDecoration: "none", color: "black", cursor: "default" }}
          shareUrl={shareUrl}
        >
          <Card
            style={{
              width: "20rem",
              flex: 1,
              margin: "0.7rem",
              //align: "center",
            }}
            className="shadow"
          >
            <Card.Body>
              <Card.Title style={cardTitle} className="font-italic ">
                {title}
                {listOfWords.length > 10 ? "..." : ""}
                <span
                  //href="#"
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={(event) => this.handleShow(event)}
                >
                  <IoMdShare />
                </span>

                <span>
                  <MdDelete
                    style={{ color: "black" }}
                    onClick={(event) => this.handleDelete(event)}
                  />
                </span>
              </Card.Title>

              <Card.Img className="mb-3" style={styles} src={image} />

              <Card.Text
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <span className="font-italic">{date}</span>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "row-reverse",
                    alignItems: "flex-end",
                  }}
                >
                  <Badge
                    style={{
                      backgroundColor: "#" + color,
                      color: this.badgeTextColor[section],
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      margin: 2,
                      //fontFamily: "Arial",

                      padding: 5,
                    }}
                  >
                    {" "}
                    {section.toUpperCase()}
                  </Badge>
                  <Badge
                    style={{
                      backgroundColor: "#" + sourceColor,
                      color: this.badgeTextColor[source],
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      margin: 2,
                      //fontFamily: "Arial",
                      padding: 5,
                    }}
                  >
                    {" "}
                    {source.toUpperCase()}
                  </Badge>
                </div>{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 550, fontSize: "1.1rem" }}>
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <div
              style={{
                fontWeight: 550,
                textAlign: "center",
                width: "100%",
                fontSize: "1.1rem",
              }}
            >
              Share via
            </div>
            <div target="_blank" style={{ textAlign: "center", width: "100%" }}>
              <FacebookModal shareUrl={shareUrl} />

              <TwitterModal shareUrl={shareUrl} />

              <MailModal shareUrl={shareUrl} />
            </div>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default FavoriteCard;
