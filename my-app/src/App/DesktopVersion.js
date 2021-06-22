import React from 'react';
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact} from "@uirouter/react";

//OnsenUI
var Ons = require('onsenui');
var ROns = require('react-onsenui');

export default class extends React.Component {
    constructor(){
      super();
    }
  
    RenderMenu(){
        const refs = [
            <ROns.ListItem ><UISref key="main" to="app.main"><ROns.Button modifier="large--quiet"> Главная </ROns.Button></UISref></ROns.ListItem >,
            <ROns.ListItem ><UISref key="main" to="app.categories"><ROns.Button modifier="large--quiet"> Категории </ROns.Button></UISref></ROns.ListItem >,
            <ROns.ListItem ><UISref key="main" to="app.account"><ROns.Button modifier="large--quiet"> Личный кабинет </ROns.Button></UISref></ROns.ListItem >,
        ]

        return refs;
    }

    render(){
      return (
    <ROns.Splitter>
      <ROns.SplitterSide
        width={200}>
        <ROns.Toolbar style={{'position': 'relative'}}>
              <div className="center"></div>
            </ROns.Toolbar>
      <ROns.List>
        {this.RenderMenu()}
      </ROns.List>
      </ROns.SplitterSide>
      <ROns.SplitterContent>
            <UIView />
      </ROns.SplitterContent>
    </ROns.Splitter>
      );
    }
  }