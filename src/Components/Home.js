import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import * as urls from '../urlsConfig';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          esriURL:urls.esriPage+'updateLots/',
          
        };

      }
    updateLots(e){
        e.preventDefault();

        fetch(this.state.esriURL, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(function(response) {
            if (response.ok) {
                return response
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                this.setState({loading:false});
                throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            alert("process finished check esri to make sure all lots are updated");
            })
           .catch(console.log);
    }
    render(){
    return (
        <div>
            <Breadcrumb className="Breadcrumbs">
                <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                <BreadcrumbItem active>Maps</BreadcrumbItem>
            </Breadcrumb>
            <h1>Maps</h1>
            <Button size="lg" className="Breadcrumbs" >
                <a href="/disconnects">Disconnects</a>
            </Button>
            <Button size="lg" className="Breadcrumbs" >
                <a href="/workOrders">Work Orders</a>
            </Button>
            <Button size="lg" onClick={e=>this.updateLots(e)} >
            update lots
            </Button>
        </div>
    )
    }
}
export default Home;