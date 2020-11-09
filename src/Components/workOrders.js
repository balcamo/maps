import React, { Component} from 'react';
import fetch from 'isomorphic-fetch';
import {  ButtonGroup, Button, Form, Table, Breadcrumb, BreadcrumbItem,UncontrolledTooltip   } from 'reactstrap';
import LoadingSpinner from './LoadingSpinner';
import * as urls from '../urlsConfig';
import {getToken} from '../urlsConfig';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';


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
        this.getDate = this.getDate.bind(this);

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
            if(data.length===0){
                this.setState({loading:false});
            }else{
                this.setState({returnedworkOrders:[]});
                this.setState({loading:false, returnedworkOrders:data})

                console.log(this.state.returnedworkOrders);
            }
            })
           .catch(console.log);
    }
    getDate(cell, row){
        var creation = new Date(cell);
        return creation.getMonth()+"/"+creation.getDate()+"/"+creation.getFullYear();
    }
    render(){
        const columns=[
            { 
                dataField: 'WorkOrderIndex',
                text: 'W.O. Num',
                sort:true
            },{ 
                dataField: 'creationDate',
                text: 'Creation Date',
                sort:true,
                formatter:this.getDate
            },{ 
                dataField: 'deptCode',
                text: 'Department',
                sort:true
            },{ 
                dataField: 'description',
                text: 'Description',
            },{ 
                dataField: 'CrewStatus',
                text: 'Crew Status',
                sort:true
            },{ 
                dataField: 'Comments',
                text: 'Crew Comments',
            },
        ]
        
    
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
                <ButtonGroup className="toggleButtons">
                    {/* TODO: Make it so items get added to the map on
                    refresh and not just initialized */}
                    <Button type="submit" 
                        onClick={e=>{if(window.confirm("By initializing the map you will clear any data on the map.\nDo you want to continue ?")){this.InitMap(e,false)}}}>Initialize Map</Button>
                    <Button  type="submit" onClick={e=>this.InitMap(e,true)}>Refresh Map</Button>
                    <Button><a target="_blank" href='arcgis-collector://?itemID=bdff0372af4349179e9e41b6e954881d'>
                    <i class="fa fa-map fa-lg"/> Open collector
                        </a>
                    </Button>
                </ButtonGroup>
                <br/>
                
                <div>
                {
                    this.state.loading ? <LoadingSpinner /> : 
                        <BootstrapTable 
                            keyField='WorkOrderIndex' 
                            data={ this.state.returnedworkOrders } 
                            columns={ columns } 
                            striped
                            hover
                            className="table"
                            pagination={ paginationFactory() }
                            />
                }
                </div>
                
            </div>
        )
    }
}
export default WorkOrders;