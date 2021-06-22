import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Desktop from "./App/DesktopVersion";
import Tabs from "./App/TabVersion";
import {useRoutes} from "./Routes/Routes";
import {AuthContext} from './App/context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact} from "@uirouter/react";
import { visualizer } from '@uirouter/visualizer';
import {useAuth} from './App/Hooks/auth.hook';

//CSS
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

//OnsenUI
var Ons = require('onsenui');
var ROns = require('react-onsenui');

//RouterConfig
function config(router) {
    
  // Specify the initial route when the initial URL matched no state
  router.urlService.rules.initial({ state: "app" });
  // Setup the state visualizer
  //visualizer(router);
};



function App (){
    const {token, login, logout, userId, role} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    
    return(
    <AuthContext.Provider value={{
        token, login, logout, userId, isAuthenticated, role
        }}>
        <ROns.Page>
            <UIRouter
            config={config}
            plugins = {[pushStateLocationPlugin, servicesPlugin]}
            states = {routes}>
                <UIView/>
            </UIRouter>
        </ROns.Page>
    </AuthContext.Provider>
    );
}

export default App;