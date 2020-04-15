import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem, ButtonGroup } from 'reactstrap';
import * as urls from '../urlsConfig';
import UpdateLot from './updateLots';
class Tools extends Component {
    
    render(){
    return (
        <div>
            <Breadcrumb className="Breadcrumbs">
                <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                <BreadcrumbItem ><a href='/'>Maps</a></BreadcrumbItem>
                <BreadcrumbItem active>Tools</BreadcrumbItem>
            </Breadcrumb>
            <h1>Tools</h1>
            <ButtonGroup>
                <UpdateLot/>
            </ButtonGroup>
        </div>
    )
    }
}
export default Tools;