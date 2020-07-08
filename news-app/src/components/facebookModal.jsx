import React, { Component } from "react";
import { FacebookIcon } from "react-share";

class FacebookModal extends Component {
  state = {};
  render() {
    return (
      <a
        href={
          "http://www.facebook.com/share.php?u=" +
          this.props.shareUrl +
          "&hashtag=%23CSCI_571_NewsApp"
        }
        hashtag="#CSCI"
        target="_blank"
        style={{ display: "inline-block", width: "33.33%" }}
      >
        <FacebookIcon round="true" />
      </a>
    );
  }
}

export default FacebookModal;
