/* eslint-disable import/no-anonymous-default-export */

import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact, useRouter} from "@uirouter/react";


var Ons = require('onsenui');
var ROns = require('react-onsenui');

export default (props) => {
    
    const [info, SetInfo] = useState(null)
    
    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        if(info === null && props.id)
            TakeInfo()
    })

    const TakeInfo = async () =>{
        const data = await request('http://localhost:5000/api/titles/get/'+props.id)

        SetInfo(data.info)
    }

    if(info !== null)
    {
        console.log(props.id)

        return(
            <UISref to="app.titlepage" params={{titleId: props.id}}>
                <ROns.Button class="Button card" modifier="large--quiet" style={{'height': '90%'}}>
                    <div style={{"display": 'inline-block', 'overflow': 'hidden', 'height': '100%'}}>
                        <img alt="" src={"http://localhost:5000/api/image/" + info.Picture} width="100"/>
                    </div>
                    <div style={{"display": 'inline-block', 'position': 'absolute', 'margin-left': '10px', 'height': '100%'}}>
                        <h1 style={{'margin': '0'}}>{info.Name}</h1>
                        <div class="card__content" style={{'overflow': 'hidden',  'white-space': 'normal', 'height': '60%'}}>
                            {info.Description}
                        </div>
                    </div>
                </ROns.Button>
            </UISref>
        );
    }
    else
        return(
            <UISref to="app.titlepage" params={{title: props.id}}>
                <ROns.Button>
                    <img alt="" style={{"display": 'inline-block'}}/>
                    <div style={{"display": 'inline-block'}}>
                        <h2></h2>
                        <div class="card__content"></div>
                    </div>
                </ROns.Button>
            </UISref>
        );
}