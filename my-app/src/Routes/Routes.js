import Main from "../App/Pages/Main";
import titlePage from "../App/Pages/TitlePage";
import UserPage from "../App/Pages/UserPage";
import TabVersion from "../App/TabVersion";
import DesktopVersion from "../App/DesktopVersion";
import SignIn from "../App/Pages/SignIn";
import SignUp from "../App/Pages/SignUp";
import Categories from "../App/Pages/Categories";
import Category from "../App/Pages/Category";
import React, {useContext, useEffect, useState, useCallback} from 'react'
import {AuthContext} from '../App/context/AuthContext'
import {useAuth} from '../App/Hooks/auth.hook'


var Ons = require('onsenui');

//check os
const os = Ons.platform.isIOS() || Ons.platform.isAndroid();

//if mobile version
var TabIndex = 0;

//mobile onEnter Hook
const onEnter = (trans, state) => {
    trans.onSuccess("", () => {
        console.log(TabIndex);
        var tabs = document.getElementsByTagName("ons-tabbar")[0];
        var btn = tabs.getElementsByTagName("button")[TabIndex];
        btn.click();
    });
}

//noop function
const noop = (trans, state) => {};

const useRoutes = (auth) => [
  {
    name: "app",
    url: "/",
    component: os? TabVersion : DesktopVersion,
    redirectTo: "app.main",
    onEnter: os ? () => { TabIndex = 0 ; return onEnter; } : noop(),
  },
  {
    name: 'app.main',
    url:"main",
    component: Main,
    onEnter: os ? () => { TabIndex = 0 ; return onEnter; } : noop(),
  },
  {
    name: 'app.categories',
    url:"categories",
    component: Categories,
    onEnter: os ?   () => { TabIndex = 1 ; return onEnter; } : noop(),
  },
  {
    name: 'app.account',
    url:"account",
    component: UserPage,
    onEnter: os ? () => { TabIndex = 2 ; return onEnter; } : noop(),
  },
  {
    name: 'app.signIn',
    url:"signIn",
    component: SignIn,
  },
  {
    name: 'app.signUp',
    url:"signUp",
    component: SignUp,
  },
  {
    name: 'app.category',
    url: 'categories/:category',
    component: Category,
  },
  {
    name: 'app.titlepage',
    url: 'titles/:titleId',
    component: titlePage,
  }
]

export {TabIndex, useRoutes}