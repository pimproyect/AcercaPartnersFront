import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrievePedidos,
  deletePedido,
  deleteAllPedidos,
} from "../actions/pedidos";
import { Link } from "react-router-dom";

class PedidosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPedido = this.onChangeSearchPedido.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActivePedido = this.setActivePedido.bind(this);
    this.removeAlPedidos = this.removeAllPedidos.bind(this);

    this.state = {
      currentPedido: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrievePedidos();
    //console.log(this.props);
  }

  onChangeSearchPedido(e) {
    const searchPedido = e.target.value;

    this.setState({
      searchTitle: searchPedido,
    });
  }

  refreshData() {
    this.setState({
      currentPedido: null,
      currentIndex: -1,
    });
  }

  setActivePedido(pedido, index) {
    this.setState({
      currentPedido: pedido,
      currentIndex: pedido.Pedido,
    });
  }

  removeAllPedidos() {
    this.props
      .deleteAllPedidos()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

   removePedido() {
       if(this.state.currentPedido != null){
       //console.log(this.state.currentPedido.Pedido);
          this.props
      .deletePedido(this.state.currentPedido.Pedido)
      .then(() => {
        this.props.history.push("/pedidos");
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }

  renderPedidosList(pedidos) {
    return pedidos.map((pedido) => {
      return (
        <tr key={pedido.Pedido}  onClick={() => this.setActivePedido(pedido)}>
          <td>{pedido.Pedido}</td>
          <td>{pedido.Bastidor}</td>
          <td>{pedido.Modelo}</td>
          <td>{pedido.Matricula}</td>
          <td>{pedido.FechaEntrega}</td>
         <td><Link to={"/pedidos/" + pedido.Pedido} className="badge badge-warning">Editar</Link></td>
         <td><button className="badge badge-danger mr-2" onClick={this.removePedido()} >Borrar</button></td>
        </tr>
      )
    })
  }

  render() {
    const {  currentPedido, currentIndex } = this.state;
    const { pedidos } = this.props;
    console.log('en render');
    console.log(this.state);
    console.log(pedidos);

    return (
      <div className="list row">
        
        <div className="col-lg-12">
          <h4>Lista de Pedidos</h4>
            <table className="col-lg-12">
                <tr>
                    <th>Pedido</th>
                    <th>Bastidor</th>
                    <th>Modelo</th>
                    <th>Matrícula</th>
                    <th>Fecha de Entrga</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    {this.renderPedidosList(pedidos)}
                </tbody>
            </table>



        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state);
  return {
    pedidos: state.pedidos,
  };
};

export default connect(mapStateToProps, {
  retrievePedidos,
  deletePedido,
  deleteAllPedidos,
})(PedidosList);
