import React, { Component } from "react";
import {
  doMergeSort,
  getAnimationOfMergeSort,
} from "../algorithms/sorting/mergeSort";
import {
  doBubbleSort,
  getAnimationOfBubbleSort,
} from "../algorithms/sorting/bubbleSort";

const PRIMARY_COLOR = "blue";
const SECONDARY_COLOR = "red";
const ANIMATION_TIME = 5;

class Sorting extends Component {
  state = {
    array: [],
  };

  componentDidMount() {
    this.generateNewArray();
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  // To generate array of random numbers
  generateNewArray = () => {
    let randomArray = [];
    for (let i = 1; i < 20; i++) {
      randomArray.push(this.randomNumber(1, 500));
    }

    this.setState({
      array: randomArray,
    });
    console.log("random array ", randomArray);
  };

  //Animation For Merge Sort
  doMergeSort = () => {
    const { array } = this.state;
    const sortedArray = doMergeSort(array, 0, array.length - 1);

    const getAnimation = getAnimationOfMergeSort;
    // const getAnimation = doMergeSort(array);;
    console.log('getAnimation ',getAnimation)
    const barsList = document.getElementsByClassName("sorting-bar");
    for (let i = 0; i < getAnimation.length - 1; i++) {
      if (i % 3 !== 2) {
        setTimeout(() => {
          let color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          barsList[getAnimation[i][0]].style.background = color;
          barsList[getAnimation[i][1]].style.background = color;
        }, i * ANIMATION_TIME);
      } else {
        setTimeout(() => {
          const [barOneIndex, newHeight] = getAnimation[i];
          barsList[barOneIndex].style.height = `${newHeight}px`;
        }, i * ANIMATION_TIME);
      }
    }
  };

  //Animation For Merge Sort
  doBubbleSort = () => {
    const { array } = this.state;
    console.log("original  array ", array);

    const sortedArray = doBubbleSort(array);
    console.log("sortedArray ", array);
    const getAnimation = getAnimationOfBubbleSort;
    console.log('getAnimation ',getAnimation );
    const barsList = document.getElementsByClassName("sorting-bar");
    console.log(barsList);
    for (let i = 0; i < getAnimation.length - 1; i++) {
      if (getAnimation[i][0]!=-1) {
        setTimeout(() => {
          let color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          barsList[getAnimation[i][0]].style.background = color;
          barsList[getAnimation[i][0]].style.background = color;
        }, i * ANIMATION_TIME);
      } else {
        setTimeout(() => {
            const barOneIndex = getAnimation[i][1];
            const newHeight = getAnimation[i][2];
            barsList[barOneIndex].style.height = `${newHeight}px`;
        
        }, i * ANIMATION_TIME);
      }
    }
  };

  render() {
    const { array } = this.state;
    console.log("array ", array);
    return (
      <div>
        <h2>Sorting</h2>
        <button onClick={() => this.generateNewArray()}>
          Generate New Array
        </button>
        <button onClick={() => this.doMergeSort()}>Merger Sort</button>
        <button onClick={() => this.doBubbleSort()}>Bubble Sort</button>
        <div className="sorting-container">
          <div className="sorting-visualisation-area">
            {array.map((value, index) => {
              return (
                <div
                  key={index}
                  className="sorting-bar"
                  style={{ height: `${value}px` }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Sorting;
