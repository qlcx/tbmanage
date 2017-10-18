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


import Amap from './components/shared/amap'
const Index = () => {
  return <Amap />
}

const NoRouter = () => {
  return <div>no router</div>
}

export default router