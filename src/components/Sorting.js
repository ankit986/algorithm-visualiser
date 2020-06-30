import React, { Component } from 'react';
import { mergerSorter, getAnimationOfMergeSort } from '../algorithms/sorting/mergeSort';

class Sorting extends Component {
    state = {
        array: []
    }

    componentDidMount() {
        this.generateNewArray()
    }

    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    // To generate array of random numbers
    generateNewArray = () => {
        let randomArray = [];
        for (let i = 1; i < 100; i++) {
            randomArray.push(this.randomNumber(10, 500));
        }
        // randomArray.sort((a, b) => a - b);

        this.setState({
            array: randomArray,
        });
    };

    //Animation For Merge Sort
    doMergeSort = () => {
        const { array } = this.state
        console.log(array)
        const sortedArray = mergerSorter(array, 0, array.length - 1)
        console.log('final ans ', sortedArray)
        console.log('animationArray ', getAnimationOfMergeSort )
        const getAnimation = getAnimationOfMergeSort;
        const barsList = document.getElementsByClassName('sorting-bar');
        console.log(barsList)
        for(let i=0;i<getAnimation.length-1; i++){
            if(i%3 !== 2){
                setTimeout(() => {
              
                    let color = i%3===0?'red':'blue'
                    barsList[getAnimation[i][0]].style.background = color
                    barsList[getAnimation[i][1]].style.background = color
                  }, i * 10);
                        
            }
            else{
                setTimeout(()=>{

                    const [barOneIndex, newHeight ] = getAnimation[i];
                    barsList[barOneIndex].style.height = `${newHeight}px`
                }, i*10)
            }
        }   
    }

    render() {
        const { array } = this.state

        return (
            <div>
                <h2>Sorting</h2>
                <button onClick={() => this.generateNewArray()}>Generate New Array</button>
                <button onClick={() => this.doMergeSort()}>Sort</button>
                <div className='sorting-container'>
                    <div className='sorting-visualisation-area'>
                        {array.map((value) => {
                            return <div
                                className='sorting-bar'
                                style={{ height: `${value}px` }}
                                key =  {value}></div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Sorting