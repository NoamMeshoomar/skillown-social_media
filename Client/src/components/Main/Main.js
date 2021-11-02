import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';
import Signup from '../Signup/Signup';
import Signin from '../Signin/Signin';
import SingleUser from '../SingleUser/SingleUser';
import SinglePost from '../SinglePost/SinglePost';
import UploadPost from '../UploadPost/UploadPost';
import Settings from '../Settings/Settings';
import Footer from '../Footer/Footer';
import PageNotFound from '../Errors/PageNotFound/PageNotFound';

import './Main.css';

const Main = () => {
    return(
        <Router>
            <NavBar />
            <div className="Main">
                <Switch>
                    <Route path="/" exact component={ Home } />
                    <Route path="/signup" exact component={ Signup } />
                    <Route path="/signin" exact component={ Signin } />
                    <Route path="/user/:userName" exact component={ SingleUser } />
                    <Route path="/post/:postId" exact component={ SinglePost } />
                    <Route path="/upload" exact component={ UploadPost } />
                    <Route path="/settings" exact component={ Settings } />
                    <Route exact component={ PageNotFound } />
                </Switch>
            </div>
            <Footer />
        </Router>
    )
}

export default Main;