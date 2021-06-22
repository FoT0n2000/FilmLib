import React, {useContext, useEffect, useCallback, useState} from 'react'
import {useHttp} from '../Hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { UISref, UIRouter, UIView, pushStateLocationPlugin, servicesPlugin, UIRouterReact, useRouter} from "@uirouter/react";

const {loading, request, error, clearError} = useHttp()

const GetCategory = async (catId) => {
    const data = await 
};

