import React, {Component} from 'react';
import { NavItem, Nav, NavLink } from 'reactstrap';
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
                        <NavLink href={urls.homePage}><span className="fa fa-home fa-lg"></span> Home </NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink href={urls.wufooBugs}><span className="fa fa-bug fa-lg"></span> Bugs</NavLink>
                    </NavItem>     
                    <NavItem >
                        <NavLink href={urls.workMang}><span className="fa fa-address-card fa-lg"></span> Work Mang.</NavLink>
                    </NavItem>                  
                </Nav>

            </div>
        );
    }
    
}
export default  NavNav;