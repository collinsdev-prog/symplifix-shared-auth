import React, { createContext } from 'react'
// 
import logo from '../../assets/logo/symplifixlogo.png'
// import app_store from '../../assets/app_store.png'
// import play_store from '../../assets/play_store.png'
// import Excel_icon from '../../assets/Icons/excel2-svgrepo-com.svg'
//
import { useNavigate, Link } from 'react-router-dom'

export const SharedContext = createContext()

const SharedContextProvider = ({ children }) => {
    const nav = useNavigate()

    const values = {
        // 
        nav,
        // 
        logo,
        // app_store,
        // play_store,
        // Excel_icon,
    }
    return (
        <SharedContext.Provider value={values}>
            {children}
        </SharedContext.Provider>
    )
}

export default SharedContextProvider
