import React, { Component} from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/WebMap', 'esri/views/MapView',"esri/layers/FeatureLayer"], { css: true })
    .then(([WebMap, MapView, FeatureLayer]) => {
      var webmap = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "3b603af45ac34d0091ea9c011fe230d7"
        }
      });
      // var oAuthInfo = new OAuthInfo({
      //   //appId: "c0b0067693eb48c9b6996d56517ad655",
      //   portalUrl: "https://apiarydev-react-maps.azurewebsites.net/disconnects",
      //   client_id:"1wKRcHktJgWsYHFq",
      //   client_secret:"60caa1c062624a47b2d7dbae7d0d7721",
      //   popup: false
      // });
      // esriId.registerOAuthInfos([oAuthInfo]);
      
      var disconnectMeters = new FeatureLayer({
        url: "https://services3.arcgis.com/69kvdgihDDE3KD4Z/arcgis/rest/services/LiveElectricAndWater/FeatureServer/12"
      });

      
      
      this.view = new MapView({
        container: this.mapRef.current,
        map: webmap,
        //FeatureLayer: disconnectMeters,
        zoom: 13
      });
      //webmap.updateForm(this.view);

    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} />
    );
  }
}