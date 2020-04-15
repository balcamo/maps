import React,{Component} from 'react';
import { Button } from 'reactstrap';
import * as urls from '../urlsConfig';

class UpdateLot extends Component {
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
            
            <Button onClick={e=>this.updateLots(e)} >
            Update Lots
            </Button>
        </div>
    )
    }
}
export default UpdateLot;