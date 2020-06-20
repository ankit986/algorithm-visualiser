import React, { Component } from 'react'
import Numbers from './Numbers'
import binarySearch, { getAnimatedListOfVisitedElementsBS } from '../algorithms/searching/binarySearch'
import linearSearch, { getAnimatedListOfVisitedElementsLS } from '../algorithms/searching/linearSearch'
import NavBar from './NavBar'


class Searching extends Component {
    state = {
        numberToFind: 0,
        array: [1, 2, 4, 5, 6, 7, 8, 9, 11, 15, 16, 35, 74, 85, 96, 700, 744, 777, 879],
        numberOfIterationByBinarySearch: '',
        numberOfIterationByLinearSearch: '',
        elementFoundIndex: '',
        completed: false,
        running:false
    }

    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    generateNewArray = () => {
        let randomArray = []
        for (let i = 1; i < 20; i++) {
            randomArray.push(this.randomNumber(1, 20))
        }
        randomArray.sort((a, b) => a - b)
        const getBinarySearchBox = document.getElementsByClassName('Binary-Search-box')
        const getLinearSearchBox = document.getElementsByClassName('Linear-Search-box')
        for (let i = 0; i < getBinarySearchBox.length; i++) {
            getBinarySearchBox[i].className = 'Binary-Search-box box'
            getLinearSearchBox[i].className = 'Linear-Search-box box'
        }

        this.setState({
            array: randomArray
        })
    }

    doBinarySearch = (element, array) => {

        const foundIndex = binarySearch(element, array)

        const getAnimatedElements = getAnimatedListOfVisitedElementsBS
        let getBoxes = document.getElementsByClassName('Binary-Search-box box')
        console.log('number of iteration ', getAnimatedElements.length)
        for (let j = 0; j < getAnimatedElements.length * 2; j++) {
            this.setState({
                running:true
            })
            let animatedList = getAnimatedElements[Math.floor(j / 2)]
            let startIndex = animatedList[0]
            let midIndex = animatedList[1]
            let endIndex = animatedList[2]
            console.log(startIndex, midIndex, endIndex)
            if (j % 2 === 0)
                setTimeout(() => {
                    for (let i = startIndex; i <= endIndex; i++) {
                        getBoxes[i].className = 'Binary-Search-box box selected-box'
                        getBoxes[midIndex].className = 'Binary-Search-box box selected-box mid-index'
                    }
                }, j * 500)
            else
                setTimeout(() => {
                    for (let i = startIndex; i <= endIndex; i++) {
                        if (parseInt(array[i]) !== element) {
                            getBoxes[i].className = 'Binary-Search-box box'
                        }
                        if (element == array[midIndex]) {
                            getBoxes[midIndex].className = 'Binary-Search-box box answer'
                        }
                        this.setState({
                            elementFoundIndex: typeof (foundIndex) === 'number' ? foundIndex : 'not found',
                        })
                    }
                    this.setState(({ numberOfIterationByBinarySearch }) => ({
                        numberOfIterationByBinarySearch: numberOfIterationByBinarySearch + 1,
                    }))
                }, j * 500)
            if (j == getAnimatedElements.length - 1) {
                console.log('eeeee')
                this.setState({
                    completed: true,
                    running:false
                })
            }
        }

    }

    doLinearSearch = (element, array) => {
        const foundIndex = linearSearch(element, array)
        console.log('dls', element, array, foundIndex)
        const getAnimatedElements = getAnimatedListOfVisitedElementsLS
        let getBoxes = document.getElementsByClassName('Linear-Search-box')
        console.log('getanimatedlist ', getAnimatedElements)
        for (let j = 0; j < getAnimatedElements.length * 2; j++) {
            let animatedList = getAnimatedElements[Math.floor(j / 2)]
            let currentIndex = animatedList[0]

            console.log(currentIndex)
            if (j % 2 === 0)
                setTimeout(() => {
                    getBoxes[currentIndex].className = 'Linear-Search-box box selected-box'
                }, j * 500)
            else
                setTimeout(() => {

                    if (parseInt(array[currentIndex]) !== element) {
                        getBoxes[currentIndex].className = 'Linear-Search-box box'
                    }
                    if (currentIndex === foundIndex) {
                        getBoxes[currentIndex].className = 'Linear-Search-box box answer'
                    }
                    this.setState({
                        elementFoundIndex: typeof (foundIndex) === 'number' ? foundIndex : 'not found',
                    })

                    this.setState(({ numberOfIterationByLinearSearch }) => ({
                        numberOfIterationByLinearSearch: numberOfIterationByLinearSearch + 1,
                    }))
                }, j * 500)
            if (j == getAnimatedElements.length - 1) {
                this.setState({
                    completed: true
                })
            }
        }
    }

    render() {
        const handleSubmit = (e) => {
            e.preventDefault()
            this.setState({
                numberOfIterationByBinarySearch: 0,
                numberOfIterationByLinearSearch: 0,
                elementFoundIndex: undefined,
                completed: false
            })
            this.doBinarySearch(this.state.numberToFind, this.state.array)
            this.doLinearSearch(this.state.numberToFind, this.state.array)
            console.log(this.state)
        }
        const handleInput = (e) => {
            e.preventDefault()
            console.log(e.target.value)
            this.setState({
                numberToFind: e.target.value,
            })
        }

        const { elementFoundIndex, completed, numberToFind, array, numberOfIterationByBinarySearch, numberOfIterationByLinearSearch } = this.state
        return (
            <div>
                <NavBar />
                <div className='actions-container'>
                    <div className='outer-box'>
                        <form onSubmit={handleSubmit} className='search-box'>

                            <label className='f6 b db mb2'>ENTER A NUMBER TO FIND</label>
                            <input className='input-reset ba b--black-20 pa2 mb2 db ' onChange={handleInput} />
                            <button className='f6 link dim br1 ph3 pv2 mb2 dib white bg-black'>Click to Search</button>
                        </form>
                        <button
                            className='generate-new-array-button f6 link dim br1 ph3 pv2 mb2 dib white bg-black'
                            onClick={this.generateNewArray}

                        >Generate New Array</button>
                    </div>

                    <div className='detail'>
                        <div className='detail-div'>
                            <div className='selected-div' style={{ background: '#f5f55b' }}></div>
                            <h3 className='detail-heading' >Selected</h3>
                        </div>
                        <div className='detail-div' >
                            <div className='selected-div' style={{ background: '#ff1e00' }}></div>
                            <h3 className='detail-heading'>Middle Element</h3>
                        </div>
                        <div className='detail-div '>
                            <div className='selected-div' style={{ background: '#8cee03' }}></div>
                            <h3 className='detail-heading'>Found Element</h3>
                        </div>
                    </div>


                    {typeof (numberOfIterationByBinarySearch) === "number"
                        ? <div className='outer-box' style={{ flexDirection: 'column' }}>
                            <h2>Binary Search</h2>

                            <div className='inside-analysis-box'>
                                <h3>
                                    Number Of Iterations :
                                </h3>
                                <h3>
                                    {numberOfIterationByBinarySearch === 0 ? '' : numberOfIterationByBinarySearch}
                                </h3>
                            </div>
                            {
                                completed
                                    ? typeof elementFoundIndex === "number"
                                        ? <div className='inside-analysis-box'>
                                            <h3>
                                                Element Found At Index :
                                            </h3>
                                            <h3>
                                                {elementFoundIndex}
                                            </h3>
                                        </div>
                                        : <h3>Element Not Found</h3>
                                    : ''}
                        </div>
                        : ''}

                    {typeof (numberOfIterationByLinearSearch) === "number" ?
                        <div className='outer-box' style={{ flexDirection: 'column' }}>
                            <h2>Linear Search</h2>
                            <div className='inside-analysis-box'>
                                <h3>
                                    Number Of Iterations :
                                </h3>
                                <h3>
                                    {numberOfIterationByLinearSearch === 0 ? '' : numberOfIterationByLinearSearch}
                                </h3>
                            </div>
                            {
                                completed
                                    ? typeof elementFoundIndex === "number"
                                        ? <div className='inside-analysis-box'>
                                            <h3>
                                                Element Found At Index :
                                    </h3>
                                            <h3>
                                                {elementFoundIndex}
                                            </h3>
                                        </div>
                                        : <h3>Element Not Found</h3>
                                    : ''}
                        </div> : ''}

                </div>

                <div style={{ marginTop: '50px' }}>
                    <Numbers name='Binary-Search' element={numberToFind} array={array} />
                    <Numbers name='Linear-Search' element={numberToFind} array={array} />
                </div>
            </div>
        )
    }
}


export default Searching