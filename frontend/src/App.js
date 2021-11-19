import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import "./App.css";
import Dashboard from "./Components/Dashboaard/Dashboard";
import UploadFile from "./Components/UploadFile/UploadFile";
import LoginPage from "./Components/User/LoginPage";
import {GlobalContext} from "./context/Provider";
import Notification from "./Components/Notification";
import LoginPrivateRoute from "./private route/LoginPrivateRoute";
import axios from "axios";
import {getHeader} from "./context/action/auth";
import ShowFile from "./Components/UploadFile/ShowFile";

function App() {
    const {authState, authDispatch} = useContext(GlobalContext)

    return (<>
            <Notification/>

            <Router>
                <Routes>
                    {authState.is_authenticated ?
                    <><Route exact path="" element={
                        <LoginPrivateRoute>
                            <Dashboard/>
                        </LoginPrivateRoute>}/>
                    <Route exact path="/file" element={
                        <LoginPrivateRoute>
                            <UploadFile/>
                        </LoginPrivateRoute>}/>
                    <Route exact path={"/show/:fileId"} element={<ShowFile/>}/>
                    </>:

                    <Route exact path="/login" element={<LoginPage/>}/>}
                </Routes>
            </Router>
        </>

    );
}

export default App;
