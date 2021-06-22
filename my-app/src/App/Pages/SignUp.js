import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact,useRouter} from "@uirouter/react";


//OnsenUI
var Ons = require('onsenui');
var ROns = require('react-onsenui');

// eslint-disable-next-line import/no-anonymous-default-export
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

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})

      router.stateService.go('app.account')
    } catch (e) {}
  }

  return (
    <ROns.Page>
      <ROns.Toolbar style={{'position': 'relative'}}>
        <div className="center"> Регистрация </div>
      </ROns.Toolbar>
      <div>
      <div style={{"textAlign": "center", "margin": "20px 0 0 0"}}>
          <div style={{"display": "inline-block" }}>
            <ROns.Input modifier='material' type="email" name="email" float placeholder="Email address" onChange={changeHandler} required autofocus />
          </div>
          <br/>
          <div style={{"display": "inline-block", "margin": "20px 0 0 0"}}>
            <ROns.Input modifier='material' type="password" name="password" float  placeholder="Password" onChange={changeHandler} required />
          </div>
          <br/>
          <div style={{"verticalAlign": "baseline", "margin": "20px 0 0 0"}}>
              <ROns.Button style={{"margin": "0 2px 0 0"}} onClick={registerHandler} disabled={loading}> Зрегистрироваться </ROns.Button>
          </div>
        </div>
      </div>
    </ROns.Page>
  ) 
}