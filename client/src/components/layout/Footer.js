import React, { Component } from 'react'
import './footer.css'
import icon from './icon.png'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-content">
                <div className="footer-bloc">
                    <h3>
                        Created by
                    </h3>
                    <ul>
                        <li><img src={icon} alt="alt"></img>Florent Lore</li>
                        <li><img src={icon} alt="alt"></img>Mathieu Ibersien</li>
                    </ul>
                </div>
            </div>
            
            )
        }
    }
    