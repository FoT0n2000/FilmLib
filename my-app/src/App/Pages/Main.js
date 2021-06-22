import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Block from './Block';
import { UISref, UIRouter, UIView, UIRouterReact, useRouter, useCurrentStateAndParams} from "@uirouter/react";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
var Ons = require('onsenui');
var ROns = require('react-onsenui');

export default () => {

  const {loading, request, error, clearError} = useHttp()
  const [Titles, SetTitles] = useState([])

  useEffect(() => {
    if(Titles.length === 0)
      GetTitles();  
  })

  const GetTitles = async () => {
    const data = await request('http://localhost:5000/api/titles/getAll', 'GET')

    SetTitles(data.titles.map(title => title))
  }

  const CatList = () => {
    return(
      <ROns.List>
        {
          Titles.map(row => {
            return(
              <ROns.ListItem>
                <Block id={row._id}/>      
            </ROns.ListItem>
            )
          })
        }
      </ROns.List> 
    )
  }

  return (
    <ROns.Page>
      <ROns.Toolbar style={{'position': 'relative'}}>
        <div className="center"> Главная </div>
      </ROns.Toolbar>
          {CatList()} 
    </ROns.Page>
  );
}