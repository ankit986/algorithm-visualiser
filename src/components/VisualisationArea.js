import React, { Component } from "react";
import "../App.css";
import AnalysisBox from "./AnalysisBox";

class VisualisationArea extends Component {
  render() {
    const { array, name } = this.props;
    const { numberOfIteration, completed, algorithmName, elementFoundIndex } = this.props

    return (
      <>
        <div className="number-container">
          <h2 style={{ marginTop: "0px" }}>{name}</h2>
          <div style={{ display: "flex", margin: "0 5%" }}>
            {array.map((element, index) => (
              <div className={`${name}-box box`} key={index}>
                {element}
              </div>
            ))}
          </div>
          <AnalysisBox
            algorithmName={name}
            numberOfIteration={numberOfIteration}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
        </div>
      </>
    );
  }
}

export default VisualisationArea;
