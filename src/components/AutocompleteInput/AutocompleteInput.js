import React, { Component } from "react";
import ProjectService from "../../services/project-api-service";
import Context from "../../Context";
import "./AutocompleteInput.scss";

export default class Autocomplete extends Component {
  static contextType = Context;

  static defaultProperty = {
    suggestions: [],
  };

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  };

  /**
   * @function dynamically renders suggestions
   * depending on user input for specialty dropdown input
   * by checking against list of medical specialties in context
   * and returns a warning div if there are no matches
   */
  renderSuggestionListComponent(
    showSuggestions,
    userInput,
    filteredSuggestions,
    onClick
  ) {
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="Suggestions">
            {filteredSuggestions.map((suggestion) => {
              return (
                <li key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="No__Suggestions">
            <em>Sorry, no matching specialties!</em>
          </div>
        );
      }
    }
    return suggestionsListComponent;
  }

  /**
   * @function handles change event for the search bar
   * and saves the user input to state
   */
  onChange = (e) => {
    const { medicalSpecialties: suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const flattenedSuggestions = [
      ...new Set(
        suggestions
          .map((suggestion) => {
            return [...Object.keys(suggestion), ...Object.values(suggestion)];
          })
          .flat(Infinity)
          .filter((s) => s !== null)
          .map((word) => word.toLowerCase())
      ),
    ];
    const filteredSuggestions = flattenedSuggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  /**
   * @function gets the user search term
   * from the event target and passes that term
   * into the Project Service API in order to GET
   * projects that have that specialty
   */
  onClick = (e) => {
    const searchTerm = e.currentTarget.innerText;
    ProjectService.getProjectsByTopic(searchTerm);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: searchTerm,
    });
  };

  /**
   * @function handles navigating the active suggestions
   * using only the keyboard
   */
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { filteredSuggestions, showSuggestions, userInput },
    } = this;

    return (
      <>
        <input
          name="Search__Bar"
          type="text"
          id="filter_term"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {this.renderSuggestionListComponent(
          showSuggestions,
          userInput,
          filteredSuggestions,
          onClick
        )}
      </>
    );
  }
}
