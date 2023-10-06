import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  return <div id="message" className="info">{props.infoMessage}</div>
}

const mapStateToProps = (state) => {
  return {
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps)(Message);
