import React, { Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Button, Form, Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import LoadingSpinner from './LoadingSpinner';
import * as urls from '../urlsConfig';

class Disconnects extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseURL:urls.springbrook+'disconnect',
          esriURL:urls.esriPage+'disconnects/',
          selectedState: 'In Progress',
          setState:false,
          workOrderNums:[],
          dropdownOpen:false,
          setDropdownOpen:false,
          isHidden:true,
          springbrookDisconnects:[],
          returnedDisconnects:[],
          loading: false,

        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);

      }
    toggleLoading(){
        this.setState({loading:!this.state.loading})
    }
    toggleDropDown(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
    
    componentDidMount(){
      
    }
    
    InitMap(e) {
        e.preventDefault();
        this.toggleLoading();
        this.cleanEsri();

        console.log('in change function '+this.state.selectedState);
        this.getSB();
        
    }
    getSB(){
        fetch(this.state.baseURL, {
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
            return response
            } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            if(data.length===0){
                alert("There are no current disconnects for the criteria");
            }else{
                this.setState({springbrookDisconnects:[]});
                var tempdata=data;
                
                tempdata.map(val=>this.state.springbrookDisconnects.push(val.value));
                this.setState({ springbrookDisconnects:this.state.springbrookDisconnects})
            }
            this.sendToEsri();    
        })
           .catch(console.log);
           
        return false
    }
    cleanEsri(){
        console.log("in clean esri");
        fetch(this.state.esriURL, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(function(response) {
            if (response.ok) {
            return response
            } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            
            })
           .catch(console.log);
    }

    sendToEsri(){
        var meters={"meters":this.state.springbrookDisconnects.slice(0,1)};
        console.log(meters);
        fetch(this.state.esriURL+"init", {
            method:"POST",
            body:JSON.stringify(meters),
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(function(response) {
            if (response.ok) {
            return response
            } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            if(data.length===0){
                alert("There are no current disconnects for the criteria");
            }else{
                console.log(JSON.stringify(data));
            }
            this.getFromEsri();
            })
           .catch(console.log);
    }
    getFromEsri(){
        var meters=this.state.springbrookDisconnects;
        console.log(meters);
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
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            if(data.length===0){
                alert("There are no current disconnects on the map");
            }else{
                this.setState({returnedDisconnects:[]});
                console.log(data);
                this.setState({loading:false, returnedDisconnects:data})

                console.log(this.state.returnedDisconnects);
            }
            })
           .catch(console.log);
    }
    render(){
       
    const disconnects=(
            this.state.returnedDisconnects.map((item)=>
                <tr key={item.attributes.FACILITYID}>
                    <td>{item.attributes.cust_name}</td>
                    <td>{item.attributes.street_add}</td>
                    <td>{item.attributes.FACILITYID}</td>
                    <td>{item.attributes.total_amou}</td>
                </tr>
            )
    )
        
        return (
            <div>
                <Breadcrumb className="Breadcrumbs">
                    <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/">Maps</a></BreadcrumbItem>
                    <BreadcrumbItem active>Disconnects</BreadcrumbItem>
                </Breadcrumb>
                <header >
                    <h1>Disconnects</h1>
                </header>
                <Form>
                    
                    <Button type="submit" onClick={e=>this.InitMap(e)}>Initialize Map</Button>

                </Form>
                <div>
                    <h4>Disconnects</h4>  
                        {this.state.loading ? <LoadingSpinner /> : 
                            <Table bordered dark hover>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Address</td>
                                        <td>Meter #</td>
                                        <td>Balance</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {disconnects}
                                </tbody>
                            </Table>
                        }  
                </div>
                
            </div>
        )
    }
}
export default Disconnects;