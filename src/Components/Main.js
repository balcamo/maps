import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import { BrowserRouter,Switch, Route,withRouter } from 'react-router-dom';
import NavNav from './nav';
import Disconnects from './disconnects';
import WorkOrders from './workOrders';
import Home from './Home';
import Tools from './tools'
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Main extends Component{

    render(){
        return(
            <div className="container">
                <Navbar light>
                    <NavNav/>
                </Navbar>
                <BrowserRouter>
                    <Switch>
                        <Route path="/disconnects" component={Disconnects} />
                        <Route path="/workOrders" component={WorkOrders} />
                        <Route path="/tools" component={Tools} />
                        <Route path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Main);