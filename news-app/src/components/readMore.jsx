import React, { Component } from "react";
import PropTypes from "prop-types";
import Truncate from "react-truncate";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

class ReadMore extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      expanded: false,
      truncated: false,
    };

    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  }

  toggleLines(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { children, more, less, lines } = this.props;

    const { expanded, truncated } = this.state;

    return (
      <div>
        <Truncate
          lines={!expanded && lines}
          ellipsis={
            <>
              <span>... </span>
              <div>
                <a
                  style={{ cursor: "pointer", float: "right" }}
                  onClick={this.toggleLines}
                >
                  <MdExpandMore size="32px" />
                </a>
              </div>
            </>
          }
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <div>
            {" "}
            <a
              style={{ cursor: "pointer", float: "right" }}
              onClick={this.toggleLines}
            >
              <MdExpandLess size="32px" />
            </a>
          </div>
        )}
      </div>
    );
  }
}

ReadMore.defaultProps = {
  lines: 4,
};

ReadMore.propTypes = {
  children: PropTypes.node.isRequired,
  lines: PropTypes.number,
};

export default ReadMore;
