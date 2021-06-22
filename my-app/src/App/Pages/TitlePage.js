import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Player from 'react-player'
import { UISref, UIRouter, UIView, UIRouterReact, useRouter, useCurrentStateAndParams} from "@uirouter/react";
var Ons = require('onsenui');
var ROns = require('react-onsenui');

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {   

  const { state, params } = useCurrentStateAndParams()
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()

  const[title, SetTitle] = useState(null)
  const[favourite, SetFavourite] = useState(null)
  const[loaded, SetLoaded] = useState(false)

  useEffect(() => {
    if(title === null)
      GetTitle()
    if(auth.isAuthenticated && !loaded)
      GetFavourite()
  })

  const GetTitle = useCallback(async () => {
    const data = await request("http://localhost:5000/api/titles/get/"+params.titleId)

    console.log(data.info)

    SetTitle(data.info)
  }, [SetTitle,params,request])

  const GetFavourite = useCallback(async () => {
    const data = await request('http://localhost:5000/api/titles/get/user/'+ auth.userId)

    const map = await data.favourites.map(f => f._id) 

    console.log(map.includes(params.titleId))

    if(map.length === 0)
      SetFavourite(false)
    else
      SetFavourite(map.includes(params.titleId))
    SetLoaded(true)
  }, [SetFavourite,request, params, auth])

  const AddFavourite = useCallback(async () => {
    const data = await request('http://localhost:5000/api/auth/'+auth.userId+'/addfavourite', 'PUT', {title: params.titleId})

    SetFavourite(data.result)
  }, [SetFavourite,request, params, auth])

  const DelFavourite = useCallback(async () => {
    const data = await request('http://localhost:5000/api/auth/'+auth.userId+'/delfavourite', 'PUT', {title: params.titleId})

    SetFavourite(data.result)
  }, [SetFavourite,request, params, auth])

  if(title !== null)
    return (
      <ROns.Page>
        <ROns.Toolbar style={{'position': 'relative'}}>
          <div className="left"></div>
          <div className="center">{title.Name}</div>
          <ROns.Button className="right toolbar__right" disabled={!auth.isAuthenticated} onClick={favourite? DelFavourite: AddFavourite}>{favourite? "убрать" : "в избранное"}</ROns.Button>
        </ROns.Toolbar>
        <div style={{"display": 'flex'}}>
          <div style={{"display": 'inline-block' , 'margin': '10px 0 0 10px'}}>
            <img alt="" src={"http://localhost:5000/api/image/" + title.Picture} width="200"/>
          </div>
          <div style={{"display": 'inline-block', 'margin': '10px 0 0 10px'}}>
            <h1 style={{'margin': '0'}}>{title.Name}</h1>
              <div style={{'overflow': 'hidden',  'white-space': 'normal'}}>
                  {title.Description}
              </div>
            </div>
        </div>
        <div style={{'position': 'relative', 'height': '70%'}}>
          <ROns.Tabbar
            position="top"
            renderTabs = {() => {
              if(title === null)
                return []
              
              var tabs = []
              if(title.trailer)
              {
                tabs.push({
                  content: (
                  <div style={{'position': 'relative', 'width': '70%'}}>
                    <Player
                      controls
                      style={{'margin': '20px auto'}}
                      url={["http://localhost:5000/api/video/"+title.trailer]}
                    />  
                  </div>),
                  tab: <ROns.Tab label="трейлер"/>
                })
              }
              if(title.Series.length >= 1)
              {
                tabs.push({
                  content: (
                    <div style={{'position': 'relative', 'width': '70%'}}>
                      <Player
                        controls
                        style={{'margin': '20px auto'}}
                        url={[title.Series.map(s => "http://localhost:5000/api/video/"+s)]}
                      />
                    </div>),
                  tab: <ROns.Tab label={title.Series.length > 1 ? "Сериал": "Фильм"}/>
                })
              }

              return tabs
            }}
          />
        </div>
      </ROns.Page>
    )
  
    return (
      <ROns.Page>
        <ROns.Toolbar style={{'position': 'relative'}}>
          <div className="left"></div>
          <div className="center"></div>
        </ROns.Toolbar>
      </ROns.Page>
    )  
}