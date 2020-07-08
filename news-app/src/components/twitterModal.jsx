import React, { Component } from "react";
import { TwitterIcon } from "react-share";

class TwitterModal extends Component {
  state = {};
  render() {
    return (
      <a
        href={
          "https://twitter.com/intent/tweet?url=" +
          this.props.shareUrl +
          "&hashtags=CSCI_571_NewsApp"
        }
        target="_blank"
        style={{ display: "inline-block", width: "33.33%" }}
      >
        <TwitterIcon round="true" />
      </a>
    );
  }
}

export default TwitterModal;
