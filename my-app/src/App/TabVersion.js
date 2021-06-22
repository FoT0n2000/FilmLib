import React from 'react';
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact, useRouter} from "@uirouter/react";
import {TabIndex} from "../Routes/Routes"

//OnsenUI
var Ons = require('onsenui');
var ROns = require('react-onsenui');


// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
    constructor(params){
      super(params);

      this.renderTabs = this.renderTabs.bind(this);
    }
  
  
    renderTabs(activeIndex, tabbar){
      const tabs = [
        {
          content:<ROns.Page><UIView /></ROns.Page>,
          tab: <UISref key="main" to="app.main"><ROns.Tab key="main" label="главная"/></UISref>
        },
        {
          content: <ROns.Page><UIView /></ROns.Page>,
          tab: <UISref key="categories" to="app.categories"><ROns.Tab key="categories" label="категории"/></UISref>
        },
        {
          content: <ROns.Page><UIView /></ROns.Page>,
          tab: <UISref key="settings" to="app.account"><ROns.Tab key="settings" label="настройки"/></UISref>
        }
      ]
      return tabs;
    }
  
    render(){
      return (
        <ROns.Tabbar key="tabs" renderTabs={this.renderTabs} index={TabIndex} position="top" animation = "slide" />
      );
    }
  }