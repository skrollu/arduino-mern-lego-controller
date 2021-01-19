import React, { Component } from 'react'
import socketIOClient from "socket.io-client";

import '../css/main/door.css'


export default class Door extends Component {
    constructor() {
        super();
        const socket = socketIOClient('/');//take the proxy define in the package.json file http://loaclhost:5000
        
        this.state = {
            socket: socket,
            datas: [],
            open: false,
            inc: 0
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.switchLight = this.switchLight.bind(this);
    }

    componentDidMount() {
        this.state.socket.on("arduino", data => {
            this.addData(data);
        });
    }

    //We only keep the 20 last received data in the state
    addData(data) {

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

    switchLight(e){
        let newInc = this.state.inc+1;

        this.setState({ inc: newInc }, () => {
            const light = {
                on: this.state.inc
            }

            this.state.socket.emit("client", light);
        })
    }

    render() {
        return (
            <div className="door">
                
               <div className="arduino-component-bloc">
                   <h2>Porte { this.state.open ? <span className="doorState open"> ouverte </span> : <span className="doorState close"> fermée </span> }</h2>

                   <ul>
                       { this.state.datas.map(data => (
                             <li>{data.angle}</li>
                        )) }
                   </ul>

                   <button onClick={ this.switchLight }>Lumière</button>
               </div> 
            </div>
        )
    }
}
