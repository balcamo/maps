import React, { Component} from 'react';
import fetch from 'isomorphic-fetch';
import {  ButtonGroup, Button, Form, Table, Breadcrumb, BreadcrumbItem,UncontrolledTooltip   } from 'reactstrap';
import LoadingSpinner from './LoadingSpinner';
import * as urls from '../urlsConfig';
import { WebMapView } from './WebMapViewer';
import {getToken} from '../urlsConfig';

class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseURL:urls.springbrook+'WorkOrder/ByStatus?status=in%20progress',
          esriURL:urls.esriPage+'workOrders/',
          selectedState: 'In Progress',
          setState:false,
          workOrderNums:[],
          dropdownOpen:false,
          setDropdownOpen:false,
          isHidden:true,
          springbrookworkOrders:[],
          returnedworkOrders:[],
          loading: false,
          esriEndpoint:'',
          list:true,
          disdata:"",
          clientToken:getToken
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
        if(!refresh){
            fetch(this.state.esriURL+'delete',{method:"GET"})
            .then(function(response) {
                if (response.ok) {
                return response
                } else {
                var error = new Error(response.statusText);
                error.response = response;
                this.setState({loading:false});
                throw error;
                }
            }).then(()=>{
                console.log('in change function '+this.state.selectedState);
                this.toggleLoading();
                
                this.getSB(refresh);
            }).catch(console.log)
            
        } else {
            console.log('in change function '+this.state.selectedState);
            this.toggleLoading();
            this.getSB(refresh);
        }
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
            console.log(data[0]);
            if(data.length===0){
                alert("There are no current workOrders for the criteria");
            }else{
                this.setState({springbrookworkOrders:[]});
                var tempdata=data;
                
                tempdata.map(val=>this.state.springbrookworkOrders.push(val));
                this.setState({ springbrookworkOrders:this.state.springbrookworkOrders});
            }
            this.sendToEsri(refresh); 
        })
        .catch(console.log);
           
        return false
    }
    
    sendToEsri(refresh){
        var meters={"workOrders":[],"token":this.state.clientToken};
        console.log(meters);
        if(refresh){
            var url = this.state.esriURL+'refresh';
        }else{
            var url = this.state.esriURL+'init';
        }
		for(var i=0;i<this.state.springbrookworkOrders.length;i++){
           // console.log(i);
			var wOrders=this.state.springbrookworkOrders[i];
            meters.workOrders=wOrders;
            console.log(wOrders);
			fetch(url, {
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
					alert("There are no current workOrders for the criteria");
				}else{
					console.log(JSON.stringify(data));
				}
			   
			})
			
			.catch(console.log);
		}
		this.getFromEsri();
    }
    
    getFromEsri(){
        var workOrders=this.state.springbrookworkOrders;
        //console.log(workOrders);
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
            //console.log(data);
            if(data.length===0){
                this.setState({loading:false});
            }else{
                this.setState({returnedworkOrders:[]});
                //console.log(data);
                this.setState({loading:false, returnedworkOrders:data})

                console.log(this.state.returnedworkOrders);
            }
            })
           .catch(console.log);
    }
    render(){
        var workOrders;
        if(this.state.returnedworkOrders.length == 0){
            workOrders = (
                <p>There is not data to be returned from Esri. Try initializing the map.</p>
                );
        }  else {
            workOrders = (
                this.state.returnedworkOrders.map((item)=>
                    <tr key={item.WorkOrderIndex}>
                        <td>{item.deptCode}</td>
                        <td>{item.address1}</td>
                        <td>{item.description}</td>
                        <td>{item.notes}</td>
                    </tr>
                )
            )
        }   
        return (
            <div>
                <Breadcrumb className="Breadcrumbs">
                    <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/">Maps</a></BreadcrumbItem>
                    <BreadcrumbItem active>workOrders</BreadcrumbItem>
                </Breadcrumb>
                <header >
                    <h1>Work Orders</h1>
                </header>
                <ButtonGroup>
                    
                    <Button type="submit" 
                        onClick={e=>{if(window.confirm("By initializing the map you will clear any data on the map.\nDo you want to continue ?")){this.InitMap(e,false)}}}>Initialize Map</Button>
                    <Button type="submit" onClick={e=>this.InitMap(e,true)}>Refresh Map</Button>
                    <Button><a target="_blank" href='arcgis-collector://?itemID=bdff0372af4349179e9e41b6e954881d'>
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
                    this.state.loading ? <LoadingSpinner /> : 
                                
                        this.state.list ? 
                        <Table bordered dark hover>
                            <thead>
                                <tr>
                                    <td>Dept. Code</td>
                                    <td>Address</td>
                                    <td>Description</td>
                                    <td>Notes</td>
                                </tr>
                            </thead>
                            <tbody>
                                {workOrders}
                            </tbody>
                        </Table> :
                        <div>
                                
                                <iframe className="webmap" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" 
                                    src="https://arcgis.com/apps/View/index.html?appid=5749d49d8d4f4e1d8a0c3f6cfb8e0c01">
                                    
                                </iframe> 

                                {/* <WebMapView /> */}
                                
                        
                        </div>
                }
                </div>
                
            </div>
        )
    }
}
export default WorkOrders;