import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Block from './Block';
import { UISref, UIRouter, UIView, UIRouterReact, useRouter, useCurrentStateAndParams} from "@uirouter/react";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
var Ons = require('onsenui');
var ROns = require('react-onsenui');

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>  {

  const [add, SetAdd] = useState(false)
  const { state, params } = useCurrentStateAndParams()

  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()

  const [Titles, SetTitles] = useState([])

  useEffect(() => {
    if(Titles.length === 0)
      GetTitles();  
  })

  const GetTitles = async () => {
    const data = await request('http://localhost:5000/api/categories/get/'+params.category, 'GET')

    SetTitles(data.titles.map(title => title))
  }

  const CatList = () => {
    return(
      <ROns.List>
        {
          Titles.map(row => {
            return(
              <ROns.ListItem>
                <Block id={row}/>      
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
        <div className="center"> {params.category} </div>
      </ROns.Toolbar>
      {CatList()}
    </ROns.Page>
  )
}