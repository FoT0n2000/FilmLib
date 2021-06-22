import React, {useContext, useEffect, useState,useCallback} from 'react'
import Dropzone from 'react-dropzone'
import Block from './Block'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact, useRouter} from "@uirouter/react";


//OnsenUI
var Ons = require('onsenui');
var ROns = require('react-onsenui');

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const router = useRouter()
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()

  const [user, SetUser] = useState(null)
  const [favourite, SetFavourite] = useState(null)
  const [categories, SetCategories] = useState(null)

  const [add, SetAdd] = useState(false)

  const [category, SetCategory] = useState(null)
  const [picture, SetPicture] = useState(null)
  const [trailer, SetTraler] = useState(null)
  const [series, SetSeries] = useState([])

  const [loadedPicture, SetLoadedPicture] = useState(false)
  const [loadedTrailer, setLoadedTrailer] = useState(false)
  const [loadedSeries, setLoadedSeries] = useState([])


  const [addTraler, SetAddTraler] = useState(false)
  const [reRender, SetReRender] = useState(false)

  const [form, setForm] = useState({
    name: '', description: ''
  })

  const getUser = useCallback(async () => {
    const data = await request('http://localhost:5000/api/auth/get/'+ auth.userId)

    SetUser(data.user)
  }, [SetUser,auth,request])

  const getFavourite = useCallback(async () => {

    const data = await request('http://localhost:5000/api/titles/get/user/'+ auth.userId)

    console.log(data)

    SetFavourite(data.favourites)
  }, [request,SetFavourite, auth])


  useEffect(() => {
    if(!auth.isAuthenticated)
      router.stateService.go('app.signIn')
    if(!loading)
    {
      if(user === null)
        getUser()
      else if(favourite === null){
        getFavourite()
      }    
      
      if(categories === null)
        GetCategories()
    }
  }, [getUser, getFavourite, loading, user, favourite])

  const logoutHandler = event => {
    auth.logout()
    router.stateService.go("app.signIn")
  }

  const GetCategories = async () => {
    const data = await request('http://localhost:5000/api/categories/get', 'GET')
    SetCategories(data.categories.map(cat => cat))
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const RemoveSeriesHandler = (event) => {
    series.splice(event.target.id,1)
    SetReRender(!reRender)
    SetSeries(series)
  }

  const SwapUpHandler = (event) => {
    var id = parseInt(event.target.id)
    var tmp = series[id-1]
    series[id-1] = series[id]
    series[id] = tmp
    SetSeries(series)
    SetReRender(!reRender)
  }

  const SwapDownHandler = (event) => {
    var id = parseInt(event.target.id)
    var tmp = series[id+1]
    series[id+1] = series[id]
    series[id] = tmp
    SetSeries(series)
    SetReRender(!reRender)
  }

  const AddTitleHandler = event => {
    SetAdd(!add)
    SetAddTraler(false)
    SetSeries([])
    setForm({
      name: '', description: ''
    })
  }

  const AddHandler = async () => {
    if(trailer !== null)
    {
      const data = new FormData();
      data.append('file', trailer);
      Upload(data).then(data => {setLoadedTrailer(true); SetReRender(!reRender)});
    }
    if(series.length > 0)
    {
      series.forEach((file, index) => {
        const data = new FormData();
        data.append('file', trailer);
        Upload(data, index).then(data => {series[data.index] = true; SetSeries(series); SetReRender(!reRender)});
      });
    }

  }

  const Upload = async (data, index = null) => {

  } 

  const Favourite = () => (
    <div style={{ 'paddingLeft': '10px'}}>
      <p style={{ 'text-align': 'center'}}>Избранное</p>
      <ROns.List
        dataSource={favourite}
        renderRow={(val, index) => (
          <ROns.ListItem>         
            <Block id={val._id}/>
          </ROns.ListItem>
      )}
      />
      </div>
  )

  const AddTitleForm = () => {

    return(
      <div style={{'width': '100%', "text-align" : "center"}} disabled={loading}>
        <ROns.Button onClick={AddHandler}>Добавить</ROns.Button>

        <ROns.Input type="text" placeholder="Название" name="name" value={form.name} onChange={changeHandler} modifier="material" style={{'margin':'10px auto', 'width': '70%'}}/>
        <ROns.Select modifier="material"
          value={category}
          onChange={(event) => this.setState({value: event.target.value})}>
          
        </ROns.Select>
        <br/>
        <textarea class="textarea" rows="10" name="description" value={form.description}  onChange={changeHandler} placeholder="Описание" modifier="material" style={{'margin':'10px auto', 'width': '70%'}}/><br/>

        <ROns.Checkbox onChange={() => {if(!addTraler && trailer !== null) SetTraler(null); SetAddTraler(!addTraler)}} style={{'marginTop':'10px'}}> Трейлер </ROns.Checkbox><br/>

        {!addTraler? <div></div>:
          <div>
            <Dropzone onDrop={acceptedFiles => SetTraler(acceptedFiles[0])} accept="video/mp4"> 
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    
                    {trailer !== null ? <p> {trailer.name} | размер: {Math.floor(trailer.size/(1024**2) * 100)/100}МБ</p>: <p></p> }
                    <p> Перетащите файл трейлера или <ROns.Button type="file">выберите файл</ROns.Button></p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        }

        <div style={{'border-top':'solid 2px', 'margin':'10px auto'}}>
          <Dropzone onDrop={acceptedFiles => {SetSeries(series.concat(acceptedFiles))}} multiple accept="video/mp4">
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>перетащите файлы видео, сериалов и фильмов или <ROns.Button type="file">выберите файлы</ROns.Button></p>
              </div>
            </section>
          )}
          </Dropzone>
        </div>
        
        <ROns.List>
          {series.map((val, index) => {
            return(
              <ROns.ListItem>
                <p>{index} : {val.name} | размер: {Math.floor(val.size/(1024**2) * 100)/100}МБ</p>
                <ROns.Button style={{'margin':'10px 10px'}} id={index} onClick={RemoveSeriesHandler}>Убрать</ROns.Button>
                <ROns.Button style={{'margin':'10px 10px'}} id={index} disabled={series.length === index + 1} onClick={SwapDownHandler}>˅</ROns.Button>
                <ROns.Button style={{'margin':'10px 10px'}} id={index} disabled={index === 0} onClick={SwapUpHandler}>˄</ROns.Button>
              </ROns.ListItem>
            )
          })}
        </ROns.List>

      </div>
  )}

  if(!(favourite === null))
  return (
    <ROns.Page>
      <ROns.Toolbar style={{'position': 'relative'}}>
        <ROns.Button className="left toolbar__left" style={{"textAlign": "center"}} onClick={AddTitleHandler}> { add? "<" : "Добавить"} </ROns.Button>
        <div className="center toolbar__center"> личный кабинет </div>
        <ROns.Button className="right toolbar__right" style={{"textAlign": "center"}} onClick={logoutHandler}> Выход </ROns.Button>
      </ROns.Toolbar>
      <div style={{ 'paddingLeft': '10px'}}> 
        <div className="left">
        </div>
        <div className="right">
        <p>{user.email}</p>
        <p>{user.role === 0? "пользователь" : "администратор"}</p>
        <ROns.Input type="password" material placeholder="новый пароль"/>
        <ROns.Input type="password" material placeholder="Повторите пароль"/>
        <ROns.Button onClick={() => {}} enabled={false} material> Изменить пароль </ROns.Button>
        </div>
      </div>
      {add? AddTitleForm() : Favourite()}    
    </ROns.Page>
  );

  return (
    <ROns.Page>
      <ROns.Toolbar style={{'position': 'relative'}}>
        <div className="center"> личный кабинет </div>
        <ROns.Button className="button toolbar__right" onClick={logoutHandler}> Выход </ROns.Button>
      </ROns.Toolbar>
    </ROns.Page>
  )
}