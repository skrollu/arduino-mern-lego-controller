import React, { Component } from 'react'
import emmet from './Emmet.png'
import { Link } from 'react-router-dom'
import './error.css'

export default class Error extends Component {
    render() {
        return (
            <div className="error">
                <div className="error-image">
                    <Link to="/">
                        <img src={emmet} alt="alt"></img>
                    </Link>
                </div>
                <div className="error-title">
                    <h1>Tu es perdu ? Cliques sur moi pour retrouver ton chemin !</h1>
                </div>
            </div>
        )
    }
}
