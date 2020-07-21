import React from "react";
import PropTypes from "prop-types";

export default function ErrorMessage(props) {
  return <p className="Error__Msg">{props.error}</p>;
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
};
