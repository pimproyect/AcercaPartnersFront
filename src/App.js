import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPedido from './components/addpedidos.component'
import PedidosList from './components/pedidoslist.component'
import Pedido from './components/pedido.component'

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/pedidos"} className="nav-link">
                Pedidos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Añadir
              </Link>
            </li>
          </div>
        </nav>
 
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/pedidos"]} component={PedidosList} />
            <Route exact path="/add" component={AddPedido} />
            <Route path="/pedidos/:Pedido" component={Pedido} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
