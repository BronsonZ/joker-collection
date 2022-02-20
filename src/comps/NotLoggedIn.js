import React from "react";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
    return (
            <div>
              <h1 className="text-center mt-3">You are not logged in!</h1>
              <Link className="text-reset" to="/login">Login Page</Link>
            </div>
    )
}

export default NotLoggedIn;