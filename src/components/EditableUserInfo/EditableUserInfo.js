import React, { Component } from "react";
import "./EditableUserInfo.scss";

export default class EditableUserInfo extends Component {
  state = {
    isBeingEdited: false,
  };

  handleSubmit = () => {

  }

  handleEditMode = () => {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited,
    });
  };

  render() {
    const {userInfo} = this.props;
    return (
      <div className="Editable">
        {this.state.isBeingEdited ? (
          <>
            <input autoFocus defaultValue={userInfo} type="text" />
            <i onClick={this.handleSubmit} className="far fa-check-circle"></i>
            <i onClick={this.handleEditMode} className="fas fa-times"></i>
          </>
        ) : (
          <>
            <p>{userInfo}</p>
            <i onClick={this.handleEditMode} className="fas fa-pencil-alt"></i>
          </>
        )}
      </div>
    );
  }
}
