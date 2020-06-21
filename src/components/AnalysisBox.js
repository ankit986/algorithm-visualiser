import React, { Component } from "react";
import "../App.css";

class AnalysisBox extends Component {
  render() {
    const {
      numberOfIteration,
      completed,
      algorithmName,
      elementFoundIndex,
    } = this.props;

    return (
      <>
        {typeof numberOfIteration === "number" ? (
          <div className="outer-box mv3" style={{ flexDirection: "column" }}>
            <h2>{algorithmName}</h2>

            <div className="inside-analysis-box">
              <h3>Number Of Iterations :</h3>
              <h3>{numberOfIteration === 0 ? "" : numberOfIteration}</h3>
            </div>
            {completed ? (
              typeof elementFoundIndex === "number" ? (
                <div className="inside-analysis-box">
                  <h3>Element Found At Index :</h3>
                  <h3>{elementFoundIndex}</h3>
                </div>
              ) : (
                <h3>Element Not Found</h3>
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default AnalysisBox;
