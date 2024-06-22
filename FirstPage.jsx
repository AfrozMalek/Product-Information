import React from "react";
import './FirstPage.css'; // Import the updated CSS file

function FirstPage() {
    const navigateToProductPage = () => {
        window.location.href = "/productpage";
    };

    return (
        <div className="first-page-bg"> {/* Apply background image class here */}
            <div className="container">
                <div className="title">
                    <h1 className="main-heading">Product Information Application</h1>
                </div>
                <label className="label-text">Search Product Click on Button</label>
                <div>
                    <button type="button" onClick={navigateToProductPage}>Button</button>
                </div>
            </div>
        </div>
    );
}

export default FirstPage;
