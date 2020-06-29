import React from 'react'
import {connect } from 'react-redux'
import { isRunning } from '../actions/running'
import { setCurrentAlgorithm } from '../actions/algorithm'


const NavBar = (props) => {
    const handleSearchingChange = (e) => {
        console.log('props at nav ', props)
        props.dispatch(isRunning('false'))
        props.dispatch(setCurrentAlgorithm(e.target.value))
    }
    const handleSortingChange = (e) => {
    }
    return (
        <nav className="flex justify-between bb b--black-10">
            <a className="link black-70 hover-black no-underline flex items-center pa3" href="#">
                <svg
                    className="dib h1 w1"
                    data-icon="grid"
                    viewBox="0 0 32 32"
                    style={{ fill: 'currentcolor' }}>
                    <title>Super Normal Icon Mark</title>
                    <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z">
                    </path>
                </svg>
                <span style={{ padding: '0px 15px' }}> Algorithm Visualizer</span>
            </a>
            <div className="flex-grow pa3 flex items-center">
                <select
                    onChange={handleSearchingChange}
                    className="f6 ba b--white bg-white input-reset pa2 dim link pointer black  mr3 mr4-ns">
                    <option value='Search' className='ba b--white bg-white'>Search</option>
                    <option value='BinarySearch' className='ba b--white bg-white'>Binary Search</option>
                    <option value='LinearSearch' className='ba b--white bg-white'>Linear Search</option>
                    <option value='JumpSearch' className='ba b--white bg-white'>Jump Search</option>
                    <option value='InterpolationSearch' className='ba b--white bg-white'>Interpolation Search</option>
                </select>
                <select
                    onChange={handleSortingChange}
                    className="f6 ba b--white bg-white input-reset pa2 dim link pointer black  mr3 mr4-ns">
                    <option value='Search' className='ba b--white bg-white'>Sort</option>
                    <option value='BinarySearch' className='ba b--white bg-white'>Merge Sort</option>
                    <option value='LinearSearch' className='ba b--white bg-white'>Quick Sort</option>
                    <option value='JumpSearch' className='ba b--white bg-white'>Heap Sort</option>
                    <option value='InterpolationSearch' className='ba b--white bg-white'>Bubble Sort</option>
                </select>
            </div>
        </nav>

    )
}

function mapStateToProps({isrunning, currentAlgorithm}){
    console.log('at navbar state', isrunning, currentAlgorithm)
    return {
        isrunning,
        currentAlgorithm
    }
}

export default connect(mapStateToProps)(NavBar)