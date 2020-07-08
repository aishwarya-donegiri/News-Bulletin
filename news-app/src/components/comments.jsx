import React, { Component } from "react";
//import qs from "qs";
import commentBox from "commentbox.io";
// or if using the CDN, it will be available as a global "commentBox" variable.

//console.log("queryParams");

commentBox("5759892509949952-proj");

class Comments extends React.Component {
  componentDidMount() {
    this.removeCommentBox = commentBox("5714318410645504-proj", {
      defaultBoxId: this.props.id,
    });
    //console.log(this.removeCommentBox);
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  render() {
    console.log(this.props.id);
    return <div className="commentbox" />;
  }
}

export default Comments;
