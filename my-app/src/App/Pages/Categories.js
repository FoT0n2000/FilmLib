import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact, useRouter} from "@uirouter/react";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
var Ons = require('onsenui');
var ROns = require('react-onsenui');

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>  {

  const [add, SetAdd] = useState(false)
  const [categories, SetCategories] = useState([])

  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()

  const [form, setForm] = useState({
    name: '', titles : []
  })

  useEffect(() => {
    if(categories.length === 0)
      GetCategories();  
  })

  const GetCategories = async () => {
    const data = await request('http://localhost:5000/api/categories/get', 'GET')
    SetCategories(data.categories.map(cat => cat))
  }

  const AddHandler = () => {
    if(add)
      SetAdd(false)
    else
      SetAdd(true)
  } 

  const AddToBaseHandler = async () =>{
    try {
      const data = await request('http://localhost:5000/api/categories/add', 'POST', {...form})
      
      GetCategories()
      SetAdd(false)
    } catch (e) {}
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const AdminButton = () => {
    if(auth.role === 1)
    {
      if(!add)
        return(<ROns.Button className="left toolbar__left" style={{"textAlign": "center"}} onClick={AddHandler}>добавить</ROns.Button >)
      else
        return(<ROns.Button className="left toolbar__left" style={{"textAlign": "center"}}  onClick={AddHandler}>Назад</ROns.Button >)
    }
  }

  

  const CatList = () => {
    return(
      <ROns.List>
        {
          categories.map(row => {
            return(
            <ROns.ListItem>
              <UISref to="app.category" params={{category:row.name, catid:row.id}}><ROns.Button modifier="large--quiet">{row.name}</ROns.Button></UISref>
            </ROns.ListItem>
            )
          })
        }
      </ROns.List> 
    )
  }

  const AddCat = () => {
    return (
      <div style={{"textAlign": "center", "margin": "20px 0 0 0"}}>
        <div style={{"display": "inline-block" }}>
              <ROns.Input modifier='material' name="name" type="text" float placeholder="Category name"  value={form.name} onChange={changeHandler} required autofocus />
        </div>
        <ROns.Button style={{"margin": "0 2px 0 0"}} onClick={AddToBaseHandler} disabled={loading}> Добавить </ROns.Button>
      </div>
    )
  }

  return (
    <ROns.Page>
      <ROns.Toolbar style={{'position': 'relative'}}>
        <div className="center"> Категории </div>
        {AdminButton()}
      </ROns.Toolbar>
      {add? AddCat(): CatList()}
    </ROns.Page>
  )
}