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
        };
        
        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.switchLight = this.switchLight.bind(this);
    }
    
    componentDidMount() {
        this.state.socket.on("arduino", data => {
            this.loadData(data);
        });
    }
    
    //We only keep the 20 last received data in the state
    loadData(data) {
        console.log("Received: " + data.open)
        let newDatas = this.state.datas;

        if(this.state.datas.length >= 20) {
            newDatas.shift(); // retire le premier element    
        }

        newDatas.push(data.open) // ajoute data à la fin du tableau 
        
        this.setState({
            datas: newDatas,
            open: data.open
        })
    }
    
    switchLight(e){
        console.log("Click: " + this.state.open);
        const toSend = {
            open: !this.state.open
        }
        this.state.socket.emit("client", toSend);
    }
    
    render() {
        return (
            <div className="door">
                <div className="door-bloc">
                    <div className="door-header">
                        <h2>Porte { this.state.open ? <span className="doorState open"> ouverte </span> : <span className="doorState close"> fermée </span> }</h2>
                        <button id="openClose-btn" onClick={ this.switchLight }>Ouvrir/Fermer</button>
                    </div>
                    <ul>
                        <div className="door-historic">
                            { this.state.datas.map(d => (
                                <li>{ d ? <span> ouverte </span> : <span> fermée </span> }</li>
                            )) }
                        </div>
                    </ul>
                </div> 
            </div>
        )
    }
}
