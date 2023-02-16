import React from "react";
import Store from "./SnackBarStoreContext";

const App = () => {
    return (
        <Store>
            <div>
                <h1>Test</h1>
            </div>
        </Store>
    );
};

export default App;