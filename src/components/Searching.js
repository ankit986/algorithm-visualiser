import React, { Component } from "react";
import VisualisationArea from "./VisualisationArea";
import binarySearch, {getAnimatedListOfVisitedElementsBS} from "../algorithms/searching/binarySearch";
import linearSearch, {getAnimatedListOfVisitedElementsLS} from "../algorithms/searching/linearSearch";
import NavBar from "./NavBar";
import jumpSearch, {getAnimatedListOfVisitedElementsJS,} from "../algorithms/searching/jumpSearch";
import interpolationSearch, { getAnimatedListOfVisitedElementsIS } from "../algorithms/searching/interpolationSearch";

const ANIMATION_TIME_GAP = 500;

class Searching extends Component {
  state = {
    numberToFind: 0,
    array: [],
    numberOfIterationByBinarySearch: "",
    numberOfIterationByLinearSearch: "",
    numberOfIterationByJumpSearch: "",
    numberOfIterationByInterpolationSearch: "",
    elementFoundIndex: 0,
    completed: false,
    running: false,
  };

  // To generate random numbers in between a range
  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // To generate array of random numbers
  generateNewArray = () => {
    let randomArray = [];
    for (let i = 1; i < 20; i++) {
      randomArray.push(this.randomNumber(1, 20));
    }
    randomArray.sort((a, b) => a - b);
    const getBinarySearchBox = document.getElementsByClassName(
      "Binary-Search-box"
    );
    const getLinearSearchBox = document.getElementsByClassName(
      "Linear-Search-box"
    );
    for (let i = 0; i < getBinarySearchBox.length; i++) {
      getBinarySearchBox[i].className = "Binary-Search-box box";
      getLinearSearchBox[i].className = "Linear-Search-box box";
    }

    this.setState({
      array: randomArray,
    });
  };

  //To perform animation of binary search
  doBinarySearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Binary-Search-box box");
    const foundIndex = binarySearch(element, array);
    const getAnimatedElements = getAnimatedListOfVisitedElementsBS;
    // console.log('number of iteration ', getAnimatedElements.length)
    console.log('interp ',interpolationSearch(element, array))
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      this.setState({
        running: true,
      });
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let startIndex = animatedList[0];
      let midIndex = animatedList[1];
      let endIndex = animatedList[2];
      // console.log(startIndex, midIndex, endIndex)
      if (j % 2 === 0)
        setTimeout(() => {
          for (let i = startIndex; i <= endIndex; i++) {
            getBoxes[i].className = "Binary-Search-box box selected-box";
            getBoxes[midIndex].className =
              "Binary-Search-box box selected-box mid-index";
          }
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          for (let i = startIndex; i <= endIndex; i++) {
            if (parseInt(array[i]) !== element) {
              getBoxes[i].className = "Binary-Search-box box";
            }
            if (element == array[midIndex]) {
              getBoxes[midIndex].className = "Binary-Search-box box answer";
            }
            this.setState({
              elementFoundIndex:
                typeof foundIndex === "number" ? foundIndex : "not found",
            });
          }
          this.setState(({ numberOfIterationByBinarySearch }) => ({
            numberOfIterationByBinarySearch:
              numberOfIterationByBinarySearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        // console.log('eeeee')
        this.setState({
          completed: true,
          running: false,
        });
      }
    }
  };

  //To perform animation of linear search
  doLinearSearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Linear-Search-box");

    // This step is added in order to update the old found box to normal box
    getBoxes[this.state.elementFoundIndex].className = "Linear-Search-box box";

    const foundIndex = linearSearch(element, array);
    // console.log('dls', element, array, foundIndex)
    const getAnimatedElements = getAnimatedListOfVisitedElementsLS;
    // console.log('getanimatedlist ', getAnimatedElements)
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      // console.log(currentIndex)
      if (j % 2 === 0)
        setTimeout(() => {
          getBoxes[currentIndex].className =
            "Linear-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Linear-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Linear-Search-box box answer";
          }
          this.setState({
            elementFoundIndex:
              typeof foundIndex === "number" ? foundIndex : "not found",
          });

          this.setState(({ numberOfIterationByLinearSearch }) => ({
            numberOfIterationByLinearSearch:
              numberOfIterationByLinearSearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        this.setState({
          completed: true,
        });
      }
    }
  };

  //To perform animation of jump search
  doJumpSearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Jump-Search-box");
    getBoxes[this.state.elementFoundIndex].className = "Jump-Search-box box";

    const foundIndex = jumpSearch(element, array);
    // console.log('djs', element, array, foundIndex)
    const getAnimatedElements = getAnimatedListOfVisitedElementsJS;
    // console.log('getanimatedlist ', getAnimatedElements)
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      // console.log(currentIndex);
      if (j % 2 === 0)
        setTimeout(() => {
          // console.log("currentIndex ", currentIndex);
          getBoxes[currentIndex].className = "Jump-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Jump-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Jump-Search-box box answer";
          }
          this.setState({
            elementFoundIndex: foundIndex !== -1 ? foundIndex : "not found",
          });

          this.setState(({ numberOfIterationByJumpSearch }) => ({
            numberOfIterationByJumpSearch: numberOfIterationByJumpSearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        this.setState({
          completed: true,
        });
      }
    }
  };

  doInterpolationSearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Interpolation-Search-box");
    getBoxes[this.state.elementFoundIndex].className = "Interpolation-Search-box box";

    const foundIndex = interpolationSearch(element, array);
    // console.log('djs', element, array, foundIndex)
    const getAnimatedElements = getAnimatedListOfVisitedElementsIS;
    // console.log('getanimatedlist ', getAnimatedElements)
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      if (j % 2 === 0)
        setTimeout(() => {
          getBoxes[currentIndex].className = "Interpolation-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Interpolation-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Interpolation-Search-box box answer";
          }
          this.setState({
            elementFoundIndex: foundIndex !== -1 ? foundIndex : "not found",
          });

          this.setState(({ numberOfIterationByInterpolationSearch }) => ({
            numberOfIterationByInterpolationSearch: numberOfIterationByInterpolationSearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        this.setState({
          completed: true,
        });
      }
    }
  };

  doExponentialSearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Jump-Search-box");
    getBoxes[this.state.elementFoundIndex].className = "Jump-Search-box box";

    const foundIndex = jumpSearch(element, array);
    // console.log('djs', element, array, foundIndex)
    const getAnimatedElements = getAnimatedListOfVisitedElementsJS;
    // console.log('getanimatedlist ', getAnimatedElements)
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      console.log(currentIndex);
      if (j % 2 === 0)
        setTimeout(() => {
          console.log("currentIndex ", currentIndex);
          getBoxes[currentIndex].className = "Jump-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Jump-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Jump-Search-box box answer";
          }
          this.setState({
            elementFoundIndex: foundIndex !== -1 ? foundIndex : "not found",
          });

          this.setState(({ numberOfIterationByJumpSearch }) => ({
            numberOfIterationByJumpSearch: numberOfIterationByJumpSearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        this.setState({
          completed: true,
        });
      }
    }
  };

  doFibonacciSearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Jump-Search-box");
    getBoxes[this.state.elementFoundIndex].className = "Jump-Search-box box";

    const foundIndex = jumpSearch(element, array);
    // console.log('djs', element, array, foundIndex)
    const getAnimatedElements = getAnimatedListOfVisitedElementsJS;
    // console.log('getanimatedlist ', getAnimatedElements)
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      console.log(currentIndex);
      if (j % 2 === 0)
        setTimeout(() => {
          console.log("currentIndex ", currentIndex);
          getBoxes[currentIndex].className = "Jump-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Jump-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Jump-Search-box box answer";
          }
          this.setState({
            elementFoundIndex: foundIndex !== -1 ? foundIndex : "not found",
          });

          this.setState(({ numberOfIterationByJumpSearch }) => ({
            numberOfIterationByJumpSearch: numberOfIterationByJumpSearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        this.setState({
          completed: true,
        });
      }
    }
  };

  doUbiquitousBinarySearch = (element, array) => {
    let getBoxes = document.getElementsByClassName("Jump-Search-box");
    getBoxes[this.state.elementFoundIndex].className = "Jump-Search-box box";

    const foundIndex = jumpSearch(element, array);
    // console.log('djs', element, array, foundIndex)
    const getAnimatedElements = getAnimatedListOfVisitedElementsJS;
    // console.log('getanimatedlist ', getAnimatedElements)
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      console.log(currentIndex);
      if (j % 2 === 0)
        setTimeout(() => {
          console.log("currentIndex ", currentIndex);
          getBoxes[currentIndex].className = "Jump-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Jump-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Jump-Search-box box answer";
          }
          this.setState({
            elementFoundIndex: foundIndex !== -1 ? foundIndex : "not found",
          });

          this.setState(({ numberOfIterationByJumpSearch }) => ({
            numberOfIterationByJumpSearch: numberOfIterationByJumpSearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
        this.setState({
          completed: true,
        });
      }
    }
  };

  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
        numberOfIterationByBinarySearch: 0,
        numberOfIterationByLinearSearch: 0,
        numberOfIterationByJumpSearch: 0,
        numberOfIterationByInterpolationSearch: 0,
        elementFoundIndex: undefined,
        completed: false,
      });
      this.doBinarySearch(this.state.numberToFind, this.state.array);
      this.doLinearSearch(this.state.numberToFind, this.state.array);
      this.doJumpSearch(this.state.numberToFind, this.state.array);
      this.doInterpolationSearch(this.state.numberToFind, this.state.array);
    };
    const handleInput = (e) => {
      e.preventDefault();
      this.setState({
        numberToFind: e.target.value,
      });
    };

    const {
      elementFoundIndex,
      completed,
      numberToFind,
      array,
      numberOfIterationByJumpSearch,
      numberOfIterationByBinarySearch,
      numberOfIterationByLinearSearch,
      numberOfIterationByInterpolationSearch,
    } = this.state;
    return (
      <div>
        <NavBar />
        <div className="actions-container">
          <div className="outer-box">
            <form onSubmit={handleSubmit} className="search-box">
              <label className="f6 b db mb2">ENTER A NUMBER TO FIND</label>
              <input
                className="input-reset ba b--black-20 pa2 mb2 db "
                onChange={handleInput}
              />
              <button 
              className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black"
              disabled={array.length === 0}>
                Click to Search
              </button>
            </form>
            <button
              className="generate-new-array-button f6 link dim br1 ph3 pv2 mb2 dib white bg-black"
              onClick={this.generateNewArray}
            >
              Generate New Array
            </button>
          </div>

          <div className="detail">
            <div className="detail-div">
              <div
                className="selected-div"
                style={{ background: "#f5f55b" }}
              ></div>
              <h3 className="detail-heading">Selected</h3>
            </div>
            <div className="detail-div">
              <div
                className="selected-div"
                style={{ background: "#ff1e00" }}
              ></div>
              <h3 className="detail-heading">Middle Element</h3>
            </div>
            <div className="detail-div ">
              <div
                className="selected-div"
                style={{ background: "#8cee03" }}
              ></div>
              <h3 className="detail-heading">Found Element</h3>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "50px" }}>
        <VisualisationArea
            name="Interpolation-Search"
            element={numberToFind}
            array={array}
            algorithmName={"Interpolation Search"}
            numberOfIteration={numberOfIterationByInterpolationSearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
          <VisualisationArea
            name="Binary-Search"
            element={numberToFind}
            array={array}
            algorithmName={"Binary Search"}
            numberOfIteration={numberOfIterationByBinarySearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
          <VisualisationArea
            name="Linear-Search"
            element={numberToFind}
            array={array}
            algorithmName={"Linear Search"}
            numberOfIteration={numberOfIterationByLinearSearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
          <VisualisationArea
            name="Jump-Search"
            element={numberToFind}
            array={array}
            algorithmName={"Jump Search"}
            numberOfIteration={numberOfIterationByJumpSearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
        
        </div>
      </div>
    );
  }
}

export default Searching;
