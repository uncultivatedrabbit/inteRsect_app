import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };
  static defaultProperty = {
    suggestions: [],
  };

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  };

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

  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const flattenedSuggestions = [
      ...new Set(
        suggestions
          .map((suggestion) => {
            return [...Object.keys(suggestion), ...Object.values(suggestion)];
          })
          .flat(Infinity)
          .filter((s) => s !== null)
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

  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

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
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    return (
      <>
        <input
          type="text"
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
