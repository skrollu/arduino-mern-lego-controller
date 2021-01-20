import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import axios from 'axios';
import '../css/main/door.css';


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
        axios.get('/door').then(res => {
            this.setState({
                datas: res.data
            })
        }).catch(e => {
            console.log(e)
        });

        this.state.socket.on("arduino", data => {
            this.loadData(data);
        });
    }
    
    //We only keep the 20 last received data in the state
    loadData(data) {

        //console.log(data.date)

        let newDatas = this.state.datas;

        if(this.state.datas.length >= 20) { newDatas.shift(); }
        newDatas.push(data) // ajoute data à la fin du tableau 
        this.setState({
            datas: newDatas,
            open: data.open
        })
    }
    
    switchLight(e){
        //console.log("Click: " + this.state.open);
        const toSend = {
            open: !this.state.open
        }
        this.state.socket.emit("client", toSend);
    }
    
    render() {
        const historic = this.state.datas.map(d => (
            <li>{ new Date(d.date).toUTCString() }: { d.open ? <span className="open"> ouverte </span> : <span className="close"> fermée </span> }</li>
        ))
        
        console.log("historic")
        console.log(historic)

        return (
            <div className="door">
                <div className="door-bloc">
                    <div className="door-header">
                        <h2>Porte { this.state.open ? <span className="doorState open"> ouverte </span> : <span className="doorState close"> fermée </span> }</h2>
                        <button id="openClose-btn" onClick={ this.switchLight }>{this.state.open ? <span>Fermer</span> : <span>Ouvrir</span>}</button>
                    </div>
                    <ul>
                        <div className="door-historic">
                          { historic }
                        </div>
                    </ul>
                </div> 
            </div>
        )
    }
}
