import React, { Component} from 'react';
import fetch from 'isomorphic-fetch';
import {  ButtonGroup, Button, Form, Table, Breadcrumb, BreadcrumbItem,UncontrolledTooltip   } from 'reactstrap';
import LoadingSpinner from './LoadingSpinner';
import * as urls from '../urlsConfig';
import { WebMapView } from './WebMapViewer';


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
          esriEndpoint:'',
          list:true,
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
      this.getFromEsri();
    }
    
    InitMap(e,refresh) {
        e.preventDefault();
        this.toggleLoading();
        //this.cleanEsri();

        console.log('in change function '+this.state.selectedState);
        this.getSB(refresh);
        
    }
    getSB(refresh){
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
            this.setState({loading:false});
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
            this.sendToEsri(refresh); 
        })
           .catch(console.log);
           
        return false
    }
   
    sendToEsri(refresh){
        var meters={"meters":this.state.springbrookDisconnects};
        console.log(meters);
        if(refresh){
            var url = this.state.esriURL+'refresh';
        }else{
            var url = this.state.esriURL+'init';
        }
        fetch(url, {
            //mode:"no-cors",
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
            this.setState({loading:false});
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
           
            }).then(()=>{
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
            this.setState({loading:false});
            throw error;
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            if(data.length===0){
                alert("There are no current disconnects on the map");
                this.setState({loading:false});
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
                    <td>{item.attributes.ADDRESS}</td>
                    <td>{item.attributes.FACILITYID}</td>
                    <td>{item.attributes.total_amount_due}</td>
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
                <ButtonGroup>
                    
                    <Button type="submit" onClick={e=>this.InitMap(e,false)}>Initialize Map</Button>
                    <Button type="submit" onClick={e=>this.InitMap(e,true)}>Refresh Map</Button>
                    <Button><a target="_blank" href='arcgis-collector://?itemID=3b603af45ac34d0091ea9c011fe230d7'>
                        Open collector
                        </a>
                    </Button>
                </ButtonGroup>
                
                <div>
                <ButtonGroup className="toggleButtons">
                    <Button id="listTooltip" onClick={e=>this.setState({list:true})}><i class="fa fa-list fa-lg"></i></Button>
                    <UncontrolledTooltip  placement="top" target="listTooltip">List View</UncontrolledTooltip >
                    <Button id="mapTooltip" onClick={e=>this.setState({list:false})}><i class="fa fa-map fa-lg"></i></Button>
                    <UncontrolledTooltip  placement="top" target="mapTooltip">Map View</UncontrolledTooltip >
                </ButtonGroup>
                    {
                        this.state.list ? 
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
                        </Table> :
                        <div>
                            {
                                this.state.loading ? <LoadingSpinner /> : 
                                
                                <iframe className="webmap" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" 
                                    src="https://arcgis.com/apps/View/index.html?appid=62042b7e3c1e42918629aac10cbcca59">
                                    
                                </iframe>

                                //<WebMapView />
                                
                            }  
                        </div>
                    }
                </div>
                
            </div>
        )
    }
}
export default Disconnects;