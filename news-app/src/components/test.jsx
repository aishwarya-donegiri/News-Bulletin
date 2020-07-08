import React, { Component } from "react";
import { Card, Badge, Modal } from "react-bootstrap";
import LinesEllipsis from "react-lines-ellipsis";

import { Link } from "react-router-dom";
import FacebookModal from "./facebookModal";
import TwitterModal from "./twitterModal";
import MailModal from "./mailModal";
import { IoMdShare } from "react-icons/io";

class ResultCard extends Component {
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
    other: "6e757c",
  };

  badgeTextColor = {
    world: "white",
    politics: "white",
    business: "white",
    technology: "black",
    sport: "black",
    sports: "black",
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

  render() {
    //console.log("render");
    //console.log("card", this.props);
    const { article, show, source } = this.props;
    const id = article.id;
    const title = article.title;
    const image = article.image;

    //console.log(temp[temp.length - 1].file, "image");
    const section = article.section;
    const color = this.getColor(section);
    //console.log(color);
    const date = article.date;
    const desc = article.desc;
    const shareUrl = article.shareUrl;
    // console.log(image);
    // console.log(article);
    const styles = {
      width: "20rem",
      maxWidth: "100%",
      height: "auto",
      //objectFit: "fill",
      float: "left",
    };

    const cardTitle = {
      fontSize: "1.25rem",
      marginBottom: "0.4rem",
    };

    const dateStyle = {
      //fontSize: "0.8rem",
      width: "auto",
      float: "left",
      fontWeight: 550,
    };
    return (
      <React.Fragment>
        <Link
          to={"/article?id=" + id}
          style={{ textDecoration: "none", color: "black" }}
          shareUrl={shareUrl}
        >
          <Card className="m-3 shadow">
            <Card.Body className="p-0">
              <Card.Img
                className="img-fluid img-thumbnail m-3 "
                style={styles}
                src={image}
              />
              <div
                className="m-3 pl-2"
                style={{ minWidth: 250, overflow: "hidden" }}
              >
                <Card.Title
                  style={cardTitle}
                  className="font-italic font-weight-bold"
                >
                  {title}
                  <span
                    //href="#"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={(event) => this.handleShow(event)}
                  >
                    <IoMdShare />
                  </span>
                </Card.Title>
                <Card.Text
                  style={{ justifyContent: "space-between" }}
                  //className="justify-content"
                >
                  {/* <Truncate lines={3} ellipsis={<span>...</span>}>
                    {desc}
                  </Truncate> */}
                  <LinesEllipsis
                    style={{ whiteSpace: "pre-wrap" }}
                    text={desc}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="words"
                  />
                </Card.Text>
                <Card.Text style={dateStyle} className="font-italic">
                  {date}
                </Card.Text>
                <Badge
                  style={{
                    float: "right",
                    backgroundColor: "#" + color,
                    color: this.badgeTextColor[section],
                    fontSize: "0.9rem",
                    fontWeight: 550,
                    fontFamily: "Arial",
                    padding: 5,
                  }}
                >
                  {" "}
                  {section.toUpperCase()}
                </Badge>
              </div>
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

export default ResultCard;
