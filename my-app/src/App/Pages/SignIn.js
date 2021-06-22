/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact, useRouter} from "@uirouter/react";



//OnsenUI
var Ons = require('onsenui');
var ROns = require('react-onsenui');

export default () => {

  const router = useRouter()
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    if(auth.isAuthenticated)
      router.stateService.go("app.account")
  })

  const AuthHandler = async () =>{
    try {
      const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
      
      console.log(data)
      auth.login(data.token, data.userId,data.role)

      router.stateService.go('app.account')
    } catch (e) {}
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }


  return (
    <ROns.Page>
      <ROns.Toolbar style={{'position': 'relative'}}>
        <div className="center"> авторизация </div>
      </ROns.Toolbar>
        <div style={{"textAlign": "center", "margin": "20px 0 0 0"}}>
          <div style={{"display": "inline-block" }}>
            <ROns.Input modifier='material' name="email" type="email" float placeholder="Email address"  value={form.email} onChange={changeHandler} required autofocus />
          </div>
          <br/>
          <div style={{"display": "inline-block", "margin": "20px 0 0 0"}}>
            <ROns.Input modifier='material' name="password" type="password" float  placeholder="Password" value={form.password} onChange={changeHandler} required />
          </div>
          <br/>
          <div style={{"verticalAlign": "baseline", "margin": "20px 0 0 0"}}>
              <ROns.Button style={{"margin": "0 2px 0 0"}} onClick={AuthHandler} disabled={loading}> Авторизоваться </ROns.Button>
              <UISref to="app.signUp"><ROns.Button disabled={loading}>Регистрация</ROns.Button></UISref>
          </div>
        </div>
    </ROns.Page>
  );
}