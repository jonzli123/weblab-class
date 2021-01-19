import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { input } from "semantic-ui-react";
import { navigate } from "@reach/router";
import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "213750374726-kja9m0927gafs05h0li7uc9jbbmd5i6l.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  getInput = (e) => {
    if(e.key === "Enter") {
      let inp = document.getElementById("search").value;
      navigate("/display", {state: {search: inp}})
    }
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">Price Comp</div>

        <div className = "NavBar-rightContainuer u-inlineBlock">
          <div className="NavBar-linkContainer u-inlineBlock">
            <Link to="/" className="NavBar-link">
              Home
            </Link>
          </div>
          {this.props.userId && (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          <div className="ui icon input NavBar-searchContainer u-inlineBlock">
            <input type="text" placeholder="Search..." id="search" onKeyDown={this.getInput}/>
            <i aria-hidden="true" className="search icon"></i>
          </div>
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
