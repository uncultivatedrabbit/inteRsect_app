import React, { Component } from "react";
import "./EditableUserInfo.scss";
import Context from "../../Context";
import UserApiService from "../../services/user-api-service";
import HelperFunctions from "../../utils/js/helpers";

export default class EditableUserInfo extends Component {
  static defaultProps = { match: { params: {} } };

  static contextType = Context;

  state = {
    currentUserInfo: "",
    isBeingEdited: false,
  };

  /**
   * @function keeps track of edited user input
   * and passes that input along to both context in the UI
   * and the UserAPI Service to make a PATCH request to
   * the database
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const userId = this.context.currentUser.id;
    const { editedInfo } = e.target;
    const category = this.props.currentUserInfo.split(":")[0];
    UserApiService.updateUser(userId, category, editedInfo.value);
    this.context.updateUser(category, editedInfo.value);

    this.setState({ isBeingEdited: false });
  };

  /**
   * @function sets state to either true or false
   * @boolean used to determine if
   * the user input is being edited or not
   */
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
              {category === "biography" ? (
                <textarea
                  name="editedInfo"
                  autoFocus
                  defaultValue={defaultValue}
                  // set cursor to end of default text value
                  onFocus={(e) => {
                    const val = e.target.value;
                    e.target.value = "";
                    e.target.value = val;
                  }}
                />
              ) : (
                <>
                  <label
                    className="Category__Label"
                    htmlFor="editedInfo">{`${HelperFunctions.capitalCaseName(
                    category,
                    "_"
                  )}:  `}</label>
                  <input
                    name="editedInfo"
                    autoFocus
                    defaultValue={defaultValue}
                    type={category === "email" ? "email" : "text"}
                  />
                </>
              )}
              <button type="submit">
                <i className="far fa-check-circle"></i>
              </button>
              <i onClick={this.handleEditMode} className="fas fa-times"></i>
            </form>
          </>
        ) : (
          <>
            {" "}
            <p className="Category__Label">
              {category !== "biography"
                ? `${HelperFunctions.capitalCaseName(category, "_")}:`
                : ""}
            </p>
            <p>
              {defaultValue ? `${defaultValue}` : "update your information!"}
            </p>
            {this.props.editModeEnabled ? (
              <i
                id={`${category}-icon`}
                onClick={this.handleEditMode}
                className="fas fa-pencil-alt"></i>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    );
  }
}
