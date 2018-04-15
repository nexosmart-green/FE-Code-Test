import React from "react";
import { Scene, Router } from "react-native-router-flux";
// Screens
import Home from "../screens/Home";


const RouterComponent = () => {
    return (
        <Router>
            <Scene hideNavBar>
                <Scene key="home" component={Home} initial />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
