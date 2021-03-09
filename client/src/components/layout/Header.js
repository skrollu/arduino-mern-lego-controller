import React, { Component } from 'react'
import './header.css'
import lego from "./carre_rouge_4x4_01.png"

export default class Header extends Component {
    render() {
        return (
            <div className="header-content">
                <img src={lego} alt="alt"></img>
                <div>
                    <h1>Lego Controller</h1>
                    <h4>𝘽𝙪𝙞𝙡𝙙 𝙖𝙣𝙙 𝘾𝙤𝙣𝙩𝙧𝙤𝙡</h4>
                </div>
            </div>
            )
        }
    }
    