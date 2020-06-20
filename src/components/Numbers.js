import React, { Component } from 'react'
import '../App.css'


class Numbers extends Component {

    render() {
        const { array, name } = this.props

        return (
            <>
                <div className='number-container'>
                    <h2 style={{marginTop:'0px'}}>{name}</h2>
                    <div style={{display:'flex', margin:'0 5%'}}>
                        {array.map((element, index) =>
                            <div className={`${name}-box box`} key={index}>
                                {element}
                            </div>
                        )}
                    </div>

                </div>

            </>
        )
    }
}

export default Numbers