import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePedido, deletePedido } from "../actions/pedidos";
import PedidosService from "../services/pedidos.service";

class Pedido extends Component {
  constructor(props) {
    super(props);
    this.onChangeBastidor = this.onChangeBastidor.bind(this);
    this.onChangeModelo = this.onChangeModelo.bind(this);
    this.onChangeMatricula = this.onChangeMatricula.bind(this);
    this.onChangeFechaEntrega = this.onChangeFechaEntrega.bind(this);
    this.getPedido = this.getPedido.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removePedido = this.removePedido.bind(this);

    this.state = {
      currentPedido: {
        Pedido: null,
        Bastidor: "",
        Modelo: "",
        Matricula: "",
        FechaEntrega: ""
      },
      message: "",
    };
  }

  componentDidMount() {
    //console.log(this.props);
    this.getPedido(this.props.match.params.Pedido);
  }

  onChangeBastidor(e) {
    const bastidor = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPedido: {
          ...prevState.currentPedido,
          Bastidor: bastidor,
        },
      };
    });
  }

  onChangeModelo(e) {
    const modelo = e.target.value;

    this.setState((prevState) => ({
      currentPedido: {
        ...prevState.currentPedido,
        Modelo: modelo,
      },
    }));
  }

  onChangeMatricula(e) {
    const matricula = e.target.value;

    this.setState((prevState) => ({
      currentPedido: {
        ...prevState.currentPedido,
        Matricula: matricula,
      },
    }));
  }

  onChangeFechaEntrega(e) {
    const fechaentrega = e.target.value;

    this.setState((prevState) => ({
      currentPedido: {
        ...prevState.currentPedido,
        FechaEntrega: fechaentrega,
      },
    }));
  }


  getPedido(Pedido) {
console.log('getPedido');
console.log(Pedido);
    PedidosService.get(Pedido)
      .then((response) => {
        this.setState({
          currentPedido: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      Pedido: this.state.currentPedido.Pedido,
      Bastidor: this.state.currentPedido.Bastidor,
      Modelo: this.state.currentPedido.Modelo,
      Matricula: this.state.currentPedido.Matricula,
      FechaEntrega: this.state.currentPedido.FechaEntrega
    };

    this.props
      .updatePedido(this.state.currentPedido.Pedido, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentPedido: {
            ...prevState.currentPedido
          },
        }));

        this.setState({ message: "Pedido actualizado!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updatePedido(this.state.currentPedido.Pedido, this.state.currentPedido)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "Pedido actualizado!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }



  render() {
    const { currentPedido } = this.state;

    return (
      <div>
        {currentPedido ? (
          <div className="edit-form">
            <h4>Pedido</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Bastidor</label>
                <input
                  type="text"
                  className="form-control"
                  id="Bastidor"
                  value={currentPedido.Bastidor}
                  onChange={this.onChangeBastidor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  id="Modelo"
                  value={currentPedido.Modelo}
                  onChange={this.onChangeModelo}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Matrícula</label>
                <input
                  type="text"
                  className="form-control"
                  id="Matricula"
                  value={currentPedido.Matricula}
                  onChange={this.onChangeMatricula}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Fecha de Entrega</label>
                <input
                  type="text"
                  className="form-control"
                  id="FechaEntrega"
                  value={currentPedido.FechaEntrega}
                  onChange={this.onChangeFechaEntrega}
                />
              </div>
            </form>



            

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Grabar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pedido...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updatePedido, deletePedido })(Pedido);
 