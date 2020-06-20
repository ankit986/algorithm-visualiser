import React, { Component } from 'react'
import BinarySearch from './BinarySearch'
import binarySearch, { getAnimatedListOfVisitedElements } from '../algorithms/searching/binarySearch'

class Searching extends Component {
    state = {
        numberToFind: 0,
        array: [1, 2, 4, 5, 6, 7, 8, 9, 11, 15, 16, 35, 74, 85, 96, 700, 744, 777, 879],
        numberOfIteration: '',
        elementFoundIndex: '',
        completed:false
    }

    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    generateNewArray = () => {
        let randomArray = []
        for (let i = 1; i < 20; i++) {
            randomArray.push(this.randomNumber(1, 20))
        }
        console.log(randomArray.sort((a, b) => a - b))
        this.setState({
            array: randomArray
        })
    }

    doBinarySearch = (element, array) => {

        const foundIndex = binarySearch(element, array)
        console.log('foundindex     ', foundIndex)
        const getAnimatedElements = getAnimatedListOfVisitedElements
        let getBoxes = document.getElementsByClassName('box')
        console.log('number of iteration ', getAnimatedElements.length)
        for (let j = 0; j < getAnimatedElements.length * 2; j++) {
            let animatedList = getAnimatedElements[Math.floor(j / 2)]
            let startIndex = animatedList[0]
            let midIndex = animatedList[1]
            let endIndex = animatedList[2]
            console.log(startIndex, midIndex, endIndex)
            if (j % 2 === 0)
                setTimeout(() => {
                    for (let i = startIndex; i <= endIndex; i++) {
                        getBoxes[i].className = 'box selected-box'
                        getBoxes[midIndex].className = 'box selected-box mid-index'
                    }
                }, j * 500)
            else
                setTimeout(() => {
                    for (let i = startIndex; i <= endIndex; i++) {
                        if (parseInt(array[i]) !== element) {
                            getBoxes[i].className = 'box'
                        }
                        if (element == array[midIndex]) {
                            getBoxes[midIndex].className = 'box answer'
                            this.setState({
                                elementFoundIndex: foundIndex,
                                completed:true
                            })
                        }
                    }
                    this.setState(({ numberOfIteration }) => ({
                        numberOfIteration: numberOfIteration + 1,
                    }))
                }, j * 500)
        }

    }

    render() {
        const handleSubmit = (e) => {
            e.preventDefault()
            this.setState({
                numberOfIteration: 0,
                elementFoundIndex: undefined
            })
            this.doBinarySearch(this.state.numberToFind, this.state.array)
            console.log(this.state)
        }
        const handleInput = (e) => {
            e.preventDefault()
            console.log(e.target.value)
            this.setState({
                numberToFind: e.target.value,
            })
        }

        const { elementFoundIndex,completed, numberToFind, array, numberOfIteration } = this.state
        return (
            <div>
                <div className='actions-container'>
                    <div className='outer-box'>
                        <form onSubmit={handleSubmit} className='search-box'>

                            <label>ENTER A NUMBER TO FIND</label>
                            <input onChange={handleInput} />
                            <button>click to see magic</button>
                        </form>
                        <button className='generate-new-array-button' onClick={this.generateNewArray}>Generate New Array</button>
                    </div>

                    <div className='detail'>
                        <div className='detail-div'>
                            <div className='selected-div'  style={{background:'#f5f55b'}}></div>
                            <h3 className='detail-heading' >Selected</h3>
                        </div>
                        <div className='detail-div' >
                            <div className='selected-div' style={{background:'#ff1e00'}}></div>
                            <h3 className='detail-heading'>Middle Element</h3>
                        </div>
                        <div className='detail-div '>
                            <div className='selected-div'  style={{background:'#8cee03'}}></div>
                            <h3 className='detail-heading'>Found Element</h3>
                        </div>
                    </div>


                    {typeof(numberOfIteration) === "number"?<div className='outer-box' style={{flexDirection:'column'}}>
                        <div className='inside-analysis-box'>
                            <h2>
                                Number Of Iterations :
                            </h2>
                            <h2>
                                {numberOfIteration === 0 ? '' : numberOfIteration}
                            </h2>
                        </div>
                       {
                       completed?
                       typeof elementFoundIndex === "number"? 
                       <div className='inside-analysis-box'>
                            <h2>
                                Element Found At Index :
                            </h2>
                            <h2>
                                {elementFoundIndex}
                            </h2>
                        </div>:<h1>Element Not Found</h1>:''}
                    </div>:''}

                </div>
                <BinarySearch element={numberToFind} array={array} />
            </div>
        )
    }
}


export default Searching