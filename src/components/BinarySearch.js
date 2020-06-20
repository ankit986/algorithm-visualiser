import React, { Component } from 'react'
import '../App.css'


class BinarySearch extends Component {

    render() {
        const { array } = this.props
      
        return (
            <>

                <div className='number-container'>
                    {array.map((element, index) =>
                        <div className='box' key={index}>
                            {element}
                        </div>
                    )}

                </div>

            </>
        )
    }
}

export default BinarySearch