import React from "react";
import "./app.less";
import logo from "../public/icon.jpg";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      currentMethod: "合约方法",
      contractAddr: "地址",
    };
  }

  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }

  componentDidMount() {
    let hook = function () {
      let tempRequest = ethereum.request;
      ethereum.request = function () {
        console.log("arguments", arguments);

        try {
          let newState = {};

          if (arguments[0].method && !!arguments[0].method) {
            console.log("func", arguments[0].method);
            newState["currentMethod"] = arguments[0].method;
          }

          if (
            arguments[0].params &&
            arguments[0].params.length > 0 &&
            !!arguments[0].params[0].to
          ) {
            console.log("to", arguments[0].params[0].to);
            newState["contractAddr"] = arguments[0].params[0].to;
          }

          this.setState(newState);
        } catch (error) {
          console.log(error);
        } finally {
          let result = tempRequest.apply(this, arguments);
          return result;
        }
      }.bind(this);
      alert("inject success");
    };

    setTimeout(hook.bind(this), 1000 * 2);
  }

  render() {
    let { show } = this.state;

    return (
      <>
        {show ? (
          <div className="Wokoo">
            <header className="Wokoo-header">
              <span
                className="Wokoo-close-icon"
                onClick={this.handleClose.bind(this)}
              >
                X
              </span>
              <p>{this.state.currentMethod}</p>
              <p>{this.state.contractAddr}</p>
            </header>
          </div>
        ) : (
          <div className="Wokoo-hide" onClick={this.handleClose.bind(this)}>
            <img src={logo} className="Wokoo-hide-logo" alt="logo" />
            open
          </div>
        )}
      </>
    );
  }
}
