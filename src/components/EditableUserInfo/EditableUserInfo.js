import React, { Component } from "react";
import "./EditableUserInfo.scss";
import Context from "../../Context";
import UserApiService from "../../services/user-api-service";

export default class EditableUserInfo extends Component {
  static defaultProps = { match: { params: {} } };

  static contextType = Context;

  state = {
    currentUserInfo: "",
    isBeingEdited: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userId = this.props.match.params.userId;
    const { editedInfo } = e.target;
    const category = this.props.currentUserInfo.split(":")[0];
    // Update user info in UI
    this.context.updateUser(category, editedInfo.value);
    // PATCH request for user info in DB
    UserApiService.updateUser(userId, category, editedInfo.value);
    this.setState({ isBeingEdited: false });
  };

  handleEditMode = () => {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited,
    });
  };

  render() {
    const { currentUserInfo } = this.props;
    const category = currentUserInfo.split(":")[0];
    const defaultValue = currentUserInfo.split(":")[1].trim();
    return (
      <div className="Editable">
        {this.state.isBeingEdited ? (
          <>
            <form onSubmit={this.handleSubmit}>
              {/* uses text area only for bio form */}
              {category === "bio" ? (
                <textarea
                  name="editedInfo"
                  autoFocus
                  defaultValue={defaultValue}
                  // set cursor to end of default text value
                  onFocus={(e) => {
                    const val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                  }}
                />
              ) : (
                <input
                  name="editedInfo"
                  autoFocus
                  defaultValue={defaultValue}
                  type="text"
                />
              )}
              <button type="submit">
                <i className="far fa-check-circle"></i>
              </button>
              <i onClick={this.handleEditMode} className="fas fa-times"></i>
            </form>
          </>
        ) : (
          <>
            <p>{defaultValue}</p>
            <i onClick={this.handleEditMode} className="fas fa-pencil-alt"></i>
          </>
        )}
      </div>
    );
  }
}
