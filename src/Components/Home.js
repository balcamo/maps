import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import * as urls from '../urlsConfig';
import UpdateLot from './updateLots';
class Home extends Component {
    
    render(){
    return (
        <div>
            <Breadcrumb className="Breadcrumbs">
                <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                <BreadcrumbItem active>Maps</BreadcrumbItem>
            </Breadcrumb>
            <h1>Maps</h1>
            <Button className="homeButtons" size="lg" href="/disconnects">Disconnects</Button>
            <Button className="homeButtons" size="lg" href="/workOrders">Work Orders under dev</Button>
            {/* <Button className="homeButtons" size="lg" href="/tools" >Tools</Button> */}
        </div>
    )
    }
}
export default Home;