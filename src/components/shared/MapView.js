import React, { PureComponent } from 'react'
import EsriLoader from 'esri-loader-react'
import { dojoRequire } from 'esri-loader'

export default class MapView extends PureComponent {
  constructor(props) {
    super(props)
    
    let timeStample = new Date().getTime()
    this.state = {
      mainMap: {},

      loaded: false,
    }
  }

  componentDidMount() {
    // 切片范围
    let lonLatMin ={x: 116.36856 , y: 30.764191}
    let lonLatMax ={x: 122.005714 , y: 35.128722}
    let extentMin = this.lonLat2Mercator(lonLatMin)
    let extentMax = this.lonLat2Mercator(lonLatMax)

    dojoRequire([
      'esri/Map', 
      'esri/views/MapView',
      'esri/layers/WebTileLayer',     
      'esri/widgets/Locate',
      'esri/widgets/Search',
      'esri/Graphic',
      'esri/PopupTemplate'
    ], (EsriMap, EsriMapView, WebTileLayer, Locate, Search, Graphic, PopupTemplate) => {
      let map = new EsriMap()
      let mapView = new EsriMapView({
        container: 'viewDiv',
        map: map,
        zoom: 12,
        constraints: {
          minZoom: 2,
          maxZoom: 15,
          rotationEnabled: false, // 禁止旋转
        },
        center: [118.8, 31.97]
      })
      // 添加定位按钮
      let locateWidget = new Locate({ view: mapView })
      mapView.ui.add(locateWidget, 'top-left')
      // 添加搜索栏
      let searchInput = new Search({ view: mapView })
      mapView.ui.add(searchInput, 'top-right')

      let tileLayer = new WebTileLayer({
        urlTemplate: 'http://localhost:1600/map?level={level}&row={row}&col={col}',
        copyright: '天地图',
        fullExtent: {
          xmin: extentMin.x, ymin: extentMin.y,
          xmax: extentMax.x, ymax: extentMax.y,
          // 102100: 投影坐标系
          spatialReference: {wkid: 102100}
        },
      })
      map.add(tileLayer)

      // mark 
      let polyline = {
        type: 'polyline',
        paths: [
          [118.778836727142,32.0819564125855],
          [118.778890371323,32.0839017433074],
          [118.778901100159,32.0852743582938],
          [118.77881526947,32.0868287516976],
          [118.777066469193,32.0868287516976],
          [118.776015043259,32.0868287516976],
          [118.774899244308,32.0867105823674],
        ]
      }
      let polylineSymbol = {
        type: 'simple-line',
        color: [51, 204, 51, 0.9],
        width: 4
      }
      let polylineAtt = {
        Name: 'lj',
        Owner: 'gsd'
      }
      let polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: polylineSymbol,
        attributes: polylineAtt,
        popupTemplate: {
          title: 'marriage in nanning',
          layerOptions: {
            showNoDataRecords: false
          }
        }
      })
      mapView.graphics.add(polylineGraphic)

      mapView.on('pointer-move', (e) => {
        let currentLngLat = mapView.toMap({x: e.x, y: e.y })
        // polylineGraphic()
      })
    })
  }

  onEsriApiLoaded(error) {
    if (!error) { this.setState({loaded: true}) }
  }

  render() {
    const mapOptions = { url: 'http://localhost:1600/lib/4.5/init.js' }

    return <div>
      <EsriLoader options={mapOptions} ready={this.onEsriApiLoaded.bind(this)}/>
      { this.state.loaded ? <div id='viewDiv' style={{width: '100vw', height: '100vh'}} /> : null }
    </div>
  }

  // 地理位置坐标系转墨卡托投影坐标系
  lonLat2Mercator(lonLat) {
    let mercator = {}
    mercator.x = Number(lonLat.x) * 20037508.34 / 180
    mercator.y = Math.log(Math.tan((90 + lonLat.y) * Math.PI / 360)) / (Math.PI / 180) * 20037508.34 / 180

    return mercator
  }
}