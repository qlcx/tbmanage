import React, { PureComponent } from 'react'
import styles from './amap.scss'

export default class Amap extends PureComponent {
  componentDidMount() {
    AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
      var map = new AMap.Map(document.getElementById('gmap'), {
        zoom:16
      })
      var positionPicker = new PositionPicker({
        mode: 'dragMarker',
        map: map
      })
    
      positionPicker.on('success', function(result) {
        console.log(result)
      })
      positionPicker.on('fail', function(result) {
        console.log(result)
      })

      positionPicker.start()
 
      map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar({
          liteStyle: true
        }))
      })
    })
  }

  render() {
    return <div className={styles.container}>
      <div id='gmap'></div>
    </div>
  }
}