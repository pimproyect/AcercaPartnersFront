import React, { Component } from "react";
import { connect } from "react-redux";
import { addPedido } from "../actions/pedidos";

class AddPedido extends Component {
  constructor(props) {
    super(props);
    this.onChangeBastidor = this.onChangeBastidor.bind(this);
    this.onChangeModelo = this.onChangeModelo.bind(this);
    this.onChangeMatricula = this.onChangeMatricula.bind(this);
    this.onChangeFechaEntrega = this.onChangeFechaEntrega.bind(this);
    this.savePedido = this.savePedido.bind(this);
    this.newPedido = this.newPedido.bind(this);

    this.state = {
      Pedido: null,
      Bastidor: "",
      Modelo: "",
      Matricula: "",
      FechaEntrega: "",
    };
  }

  onChangeBastidor(e) {
    this.setState({
        Bastidor: e.target.value,
    });
  }

  onChangeModelo(e) {
    this.setState({
      Modelo: e.target.value,
    });
  }

  onChangeMatricula(e) {
    this.setState({
      Matricula: e.target.value,
    });
  }

  onChangeFechaEntrega(e) {
    this.setState({
      FechaEntrega: e.target.value,
    });
  }

  savePedido() {
      console.log(this.state);
    const { Bastidor, Modelo, Matricula,  FechaEntrega } = this.state;

    this.props
      .addPedido(Bastidor, Modelo, Matricula, FechaEntrega)
      .then((data) => {
        this.setState({
          Pedido: data.Pedido,
          Bastidor: data.Bastidor,
          Modelo: data.Modelo,
          Matricula: data.Matricula,
          FechaEntrega: data.FechaEntrega,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPedido() {
    this.setState({
        Pedido: null,
        Bastidor: "",
        Modelo: "",
        Matricula: "",
        FechaEntrega: "",
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Enviado correctamente!</h4>
            <button className="btn btn-success" onClick={this.newPedido}>
              Añadir
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="bastidor">Bastidor</label>
              <input
                type="text"
                className="form-control"
                id="bastidor"
                required
                value={this.state.Bastidor}
                onChange={this.onChangeBastidor}
                name="bastidor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                className="form-control"
                id="modelo"
                required
                value={this.state.Modelo}
                onChange={this.onChangeModelo}
                name="modelo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="matricula">Matricula</label>
              <input
                type="text"
                className="form-control"
                id="matricula"
                required
                value={this.state.Matricula}
                onChange={this.onChangeMatricula}
                name="matricula"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaentrega">Fecha de Entrega</label>
              <input
                type="text"
                className="form-control"
                id="fechaentrega"
                required
                value={this.state.FechaEntrega}
                onChange={this.onChangeFechaEntrega}
                name="fechaentrega"
              />
            </div>

            <button onClick={this.savePedido} className="btn btn-success">
              Grabar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { addPedido })(AddPedido);
