import React, { Component } from "react";
import { EmailShareButton as Mail, EmailIcon } from "react-share";

class MailModal extends Component {
  state = {};
  render() {
    return (
      <Mail
        style={{ display: "inline-block", width: "33.33%" }}
        url={this.props.shareUrl}
        subject="#CSCI_571_NewsApp"
      >
        <EmailIcon round="true" />
      </Mail>
    );
  }
}

export default MailModal;
