import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel(props) {


  const handleClockwise = () => {
    props.moveClockwise()
  };

  const handleCounterClockwise = () => {
    props.moveCounterClockwise()
  };

  const cogPosition = props.wheel; //loads the current position from state - i'll use this.

  return (
    <div id="wrapper">
      <div id="wheel">
        {/* Sorry Gabe - this is clunky! I'm going to create it from array */}
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>--i is a custom CSS property, no need to touch that nor the style object */}

        {Array.from({ length: 6}).map((_, idx) => (
          <div key={idx} className={`cog ${idx === cogPosition ? 'active' : ''}`} style={{ '--i': idx}}>
            {idx === cogPosition ? 'B' : null}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button 
          id="counterClockwiseBtn" 
          onClick={handleCounterClockwise}
        >
          Counter clockwise
        </button>

        <button 
          id="clockwiseBtn" 
          onClick={handleClockwise}
        >
          Clockwise
        </button>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  wheel: state.wheel
}
)
const mapDispatchToProps = {
  moveCounterClockwise,
  moveClockwise
}; //this could just go directly in there but i dunno...

export default connect(mapStateToProps, mapDispatchToProps)(Wheel)
