import React from "react";
import "../App.css";

class Modal extends React.Component {
  state = {
    isOpen: false,
  };
  render() {
    return (
      // чтоб не доб корневой элт
      <React.Fragment>
        <button
          onClick={() => {
            this.setState({ isOpen: true });
          }}
        >
          Open modal
        </button>
        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h2>Achtung!</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                cumque esse. Inventore minima adipisci perspiciatis.
              </p>
              <button
                onClick={() => {
                  this.setState({ isOpen: false });
                }}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
