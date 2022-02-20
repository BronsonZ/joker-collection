import React from "react";
import LoginPage from "./LoginPage";

const NotLoggedIn = () => {
    return (
            <div>
              <h1 className="text-center mt-3">You are not logged in!</h1>
              <LoginPage redirect="/upload" />
            </div>
    )
}

export default NotLoggedIn;