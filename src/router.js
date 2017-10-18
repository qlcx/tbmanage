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

const Index = () => {
  return <div>首页</div>
}

const NoRouter = () => {
  return <div>no router</div>
}

export default router