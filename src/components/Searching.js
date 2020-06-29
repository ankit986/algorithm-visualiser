import React, { Component } from "react";
import SearchingVisualisationArea from "./SearchingVisualisationArea";
import binarySearch, { getAnimatedListOfVisitedElementsBS } from "../algorithms/searching/binarySearch";
import linearSearch, { getAnimatedListOfVisitedElementsLS } from "../algorithms/searching/linearSearch";
import NavBar from "./NavBar";
import jumpSearch, { getAnimatedListOfVisitedElementsJS, } from "../algorithms/searching/jumpSearch";
import interpolationSearch, { getAnimatedListOfVisitedElementsIS } from "../algorithms/searching/interpolationSearch";
import {connect} from 'react-redux'


const ANIMATION_TIME_GAP = 500;

class Searching extends Component {
  state = {
    numberToFind: 0,
    array: [],
    // currentAlgorithmName: '',
    currentAlgorithmName: '',
    numberOfIteration: '',
    numberOfIterationByBinarySearch: "",
    numberOfIterationByLinearSearch: "",
    numberOfIterationByJumpSearch: "",
    numberOfIterationByInterpolationSearch: "",
    elementFoundIndex: 0,
    completed: false,
    running: this.props.running,
  };



  componentDidUpdate(){
    console.log('searching cdu ', this.props)
    const {currentAlgorithm, isrunning} = this.props
    if(currentAlgorithm != this.state.currentAlgorithmName)
      this.setCurrentSearchingAlgorithmName(this.props.currentAlgorithm)
  }

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
   
    this.setState({
      array: randomArray,
    });
  };

  //To perform animation of binary search
  doBinarySearch = (element, array) => {

    this.setState({
      running:true
    })
    let getBoxes = document.getElementsByClassName("Binary-Search-box box");
    const foundIndex = binarySearch(element, array);
    const getAnimatedElements = getAnimatedListOfVisitedElementsBS;
   
    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      this.setState({
        running: true,
      });
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let startIndex = animatedList[0];
      let midIndex = animatedList[1];
      let endIndex = animatedList[2];
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
              this.setState({
                running:false
              })
            }
            if(foundIndex<0){
              this.setState({
                running:false
              })
            }
            this.setState({
              elementFoundIndex:
                 foundIndex >= 0 ? foundIndex : "not found",
            });
          }
          this.setState(({ numberOfIterationByBinarySearch }) => ({
            numberOfIterationByBinarySearch:
              numberOfIterationByBinarySearch + 1,
          }));
        }, j * ANIMATION_TIME_GAP);
      if (j == getAnimatedElements.length - 1) {
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
    this.setState({
      running:true
    })

    // This step is added in order to update the old found box to normal box
    getBoxes[this.state.elementFoundIndex].className = "Linear-Search-box box";

    const foundIndex = linearSearch(element, array);
    const getAnimatedElements = getAnimatedListOfVisitedElementsLS;

    for (let j = 0; j < getAnimatedElements.length * 2; j++) {
      let animatedList = getAnimatedElements[Math.floor(j / 2)];
      let currentIndex = animatedList[0];

      if (j % 2 === 0)
        setTimeout(() => {
          if (getBoxes[currentIndex])
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
            this.setState({
              running:false
            })
          }
          this.setState({
            elementFoundIndex:
               foundIndex >= 0 ? foundIndex : "not found",
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
    this.setState({
      running:true
    })
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
          if (getBoxes[currentIndex])
            getBoxes[currentIndex].className = "Jump-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Jump-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Jump-Search-box box answer";
            this.setState({
              running:false
            })
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
    this.setState({
      running:true
    })
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
          if (getBoxes[currentIndex])

            getBoxes[currentIndex].className = "Interpolation-Search-box box selected-box";
        }, j * ANIMATION_TIME_GAP);
      else
        setTimeout(() => {
          if (parseInt(array[currentIndex]) !== element) {
            getBoxes[currentIndex].className = "Interpolation-Search-box box";
          }
          if (currentIndex === foundIndex) {
            getBoxes[currentIndex].className = "Interpolation-Search-box box answer";
            this.setState({
              running:false
            })
          }
          this.setState({
            elementFoundIndex: foundIndex >= 0 ? foundIndex : "not found",
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

  setCurrentSearchingAlgorithmName = (currentAlgorithmName) => {
    if(!this.state.running)
      this.setState({
        currentAlgorithmName: currentAlgorithmName,

        numberToFind: 0,
        numberOfIteration: '',
        numberOfIterationByBinarySearch: "",
        numberOfIterationByLinearSearch: "",
        numberOfIterationByJumpSearch: "",
        numberOfIterationByInterpolationSearch: "",
        elementFoundIndex: 0,
        completed: false,
        running: false,
      })
    else{
      console.log('running')
    }
  }

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
      const { currentAlgorithmName } = this.state;
      if (currentAlgorithmName === 'BinarySearch')
        this.doBinarySearch(this.state.numberToFind, this.state.array);
      if (currentAlgorithmName === 'LinearSearch')
        this.doLinearSearch(this.state.numberToFind, this.state.array);
      if (currentAlgorithmName === 'JumpSearch')
        this.doJumpSearch(this.state.numberToFind, this.state.array);
      if (currentAlgorithmName === 'InterpolationSearch')
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
      currentAlgorithmName,
      numberToFind,
      array,
      running,
      numberOfIterationByJumpSearch,
      numberOfIterationByBinarySearch,
      numberOfIterationByLinearSearch,
      numberOfIterationByInterpolationSearch,
    } = this.state;
    return (
      <div>
        {/* <NavBar setCurrentSearchingAlgorithmName={this.setCurrentSearchingAlgorithmName} /> */}
        <div className="actions-container">
          <div className="outer-box">
            <form onSubmit={handleSubmit} className="search-box">
              <label className="f6 b db mb2">ENTER A NUMBER TO FIND</label>
              <input
                value={this.state.numberToFind}
                className="input-reset ba b--black-20 pa2 mb2 db "
                onChange={handleInput}
              />
              <button
                className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black"
                disabled={array.length === 0 || running}>
                Click to Search
              </button>
            </form>
            <button
              className="generate-new-array-button f6 link dim br1 ph3 pv2 mb2 dib white bg-black"
              onClick={this.generateNewArray}
              disabled={running}
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
          {currentAlgorithmName===''?<h1>Select Any Search Algorithm from Navigation Bar.</h1>:''}
          <SearchingVisualisationArea
            name="Interpolation-Search"
            element={numberToFind}
            array={array}
            thisAlgorithmName={"InterpolationSearch"}
            currentAlgorithmName={currentAlgorithmName}
            numberOfIteration={numberOfIterationByInterpolationSearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
          <SearchingVisualisationArea
            name="Binary-Search"
            element={numberToFind}
            array={array}
            thisAlgorithmName={"BinarySearch"}
            currentAlgorithmName={currentAlgorithmName}
            numberOfIteration={numberOfIterationByBinarySearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
          <SearchingVisualisationArea
            name="Linear-Search"
            element={numberToFind}
            array={array}
            thisAlgorithmName={"LinearSearch"}
            currentAlgorithmName={currentAlgorithmName}
            numberOfIteration={numberOfIterationByLinearSearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
          />
          <SearchingVisualisationArea
            name="Jump-Search"
            element={numberToFind}
            array={array}
            thisAlgorithmName={"JumpSearch"}
            currentAlgorithmName={currentAlgorithmName}
            numberOfIteration={numberOfIterationByJumpSearch}
            completed={completed}
            elementFoundIndex={elementFoundIndex}
            />
        </div>
      </div>
    );
  }
}

function mapStateToProps({isrunning, currentAlgorithm}){
  // console.log('at search mstp', isrunning, currentAlgorithm)
  return{
    isrunning,
    currentAlgorithm
  }
}

export default connect(mapStateToProps)(Searching);
