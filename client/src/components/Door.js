import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
//import axios from 'axios'

import '../css/main/home.css'


export default class Door extends Component {
    constructor() {
        super();
        const socket = socketIOClient('/');//take the proxy define in the package.json file http://loaclhost:5000
        
        this.state = {
            socket: socket,
            datas: [],
            open: false
        };
    }

    componentDidMount() {
        this.state.socket.on("arduino", data => {
            this.addData(data);

            this.state.socket.emit("messageReturnFromClient", this.state)
        });
    }

    //We only keep the 20 last received data in the state
    addData(data) {
        console.log(this.state)

        if(this.state.datas.length >= 20) {
            let newDatas = this.state.datas;
            newDatas.shift();
            newDatas.push(data)
            
            this.setState({
                datas: newDatas,
                open: (data > 0 ? true : false)
            })
        } else {
            let newDatas = this.state.datas;
            newDatas.push(data);

            this.setState({
                datas: newDatas,
                open: (data > 0 ? true : false)
            })
        } 
    }

    render() {
        return (
            <div className="home">
               <div className="arduino-component-bloc">
                   <h2>Porte { this.state.open ? <span className="doorState open"> ouverte </span> : <span className="doorState close"> fermée </span> }</h2>

                   <ul>
                       { this.state.datas.map(data => (
                             <li>{data.angle}</li>
                        )) }
                   </ul>
               </div> 
            </div>
        )
    }
}
