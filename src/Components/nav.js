import React, {Component} from 'react';
import { NavItem, Nav, NavLink, UncontrolledTooltip } from 'reactstrap';
import * as urls from '../urlsConfig';

class NavNav extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render(){

        return(
            <div>
                <Nav pills>
                    <NavItem>
                        <UncontrolledTooltip placement="bottom" target="home">Home</UncontrolledTooltip >
                        <NavLink id='home' href={urls.homePage}><span className="fas fa-home fa-lg"></span><a className='navText'> Home</a></NavLink>
                    </NavItem>                    
                    <NavItem >
                        <NavLink id="bugs" href={urls.wufooBugs}><span className="fas fa-bug fa-lg"></span><a className='navText'> Bugs</a></NavLink>
                        <UncontrolledTooltip placement="bottom" target="bugs">Bugs</UncontrolledTooltip >
                    </NavItem>
                    <NavItem >
                        <NavLink id="payments" href={urls.payments}><span className="fas fa-dollar-sign fa-lg"></span><a className='navText'> Payments</a></NavLink>
                        <UncontrolledTooltip placement="bottom" target="payments">Payments</UncontrolledTooltip >
                    </NavItem>
                    <NavItem >
                        <NavLink id="maps" href={urls.maps}><span className="fas fa-map fa-lg"></span><a className='navText'> Maps</a></NavLink>
                        <UncontrolledTooltip placement="bottom" target="maps">Maps</UncontrolledTooltip >
                    </NavItem>
                    <NavItem >
                        <NavLink id="workMan" href={urls.workMang}><span className="fas fa-address-card fa-lg"></span><a className='navText'> Work Mang.</a></NavLink>
                        <UncontrolledTooltip placement="bottom" target="workMan">Work Mang.</UncontrolledTooltip >
                    </NavItem>                     
                </Nav>

            </div>
        );
    }
    
}
export default  NavNav;