import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

const router = () => {
  return <Router>
    <Switch>
      <Route path='/' exact component={Index} />
      <Route component={NoRouter} />
    </Switch>
  </Router>
}

import MapView from './components/shared/MapView'
class Index extends Component {
  render() {
    return <MapView ref={ref => this.mapView = ref} />
  }
}

const NoRouter = () => {
  return <div>no router</div>
}

export default router