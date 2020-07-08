import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import FetchArticles from "./fetchArticles";
//import Test from "./test";
import FetchArticlesSection from "./fetchArticlesSection";
// import FetchWorld from "./fetchWorld";
// import FetchPolitics from "./fetchPolitics";
// import FetchBusiness from "./fetchBusiness";
// import FetchTechnology from "./fetchTechnology";
// import FetchSport from "./fetchSports";

import DescriptionCard from "./descCard";
import FetchSearchResults from "./fetchSearchResults";
import FetchFavorites from "./fetchFavorites";
//import smoothscroll from "smoothscroll-polyfill";

// const routes = [
//   { path: "/world", component: FetchWorld },
//   { path: "/politics", component: FetchPolitics },
//   { path: "/business", component: FetchBusiness },
//   { path: "/technology", component: FetchTechnology },
//   { path: "/sport", component: FetchSport },
// ];

class Content extends Component {
  render() {
    //console.log("content");

    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <FetchArticles
                {...props}
                guardian={this.props.guardian}
                setSection={this.props.setSection}
              />
            )}
          />
          {/* {routes.map(({ path: p, component: C }) => (
            <Route
              exact
              path={p}
              render={(props) => (
                <C {...props} guardian={this.props.guardian} />
              )}
            />
          ))} */}
          <Route
            path="/article"
            component={(props) => (
              <DescriptionCard
                {...props}
                guardian={this.props.guardian}
                setToggleVisibility={this.props.setToggleVisibility}
                toggleIsVisible={this.props.toggleIsVisible}
                setSection={this.props.setSection}
              />
            )}
          />
          <Route
            path="/search"
            component={(props) => (
              <FetchSearchResults
                {...props}
                guardian={this.props.guardian}
                setToggleVisibility={this.props.setToggleVisibility}
                toggleIsVisible={this.props.toggleIsVisible}
                setSection={this.props.setSection}
              />
            )}
          />
          <Route
            path="/favorites"
            component={(props) => (
              <FetchFavorites
                {...props}
                guardian={this.props.guardian}
                setToggleVisibility={this.props.setToggleVisibility}
                toggleIsVisible={this.props.toggleIsVisible}
                setSection={this.props.setSection}
              />
            )}
          />
          <Route
            path="/:section"
            render={(props) => (
              <FetchArticlesSection
                {...props}
                guardian={this.props.guardian}
                setSection={this.props.setSection}
              />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Content;
