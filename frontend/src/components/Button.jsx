import React from 'react'

function Button(props) {
    return (
        <button type="button" className="btn btn-success rounded-pill">{props.name}</button>
    )
}
export default Button