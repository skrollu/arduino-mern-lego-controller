import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import axios from 'axios';
import './door.css';
import lego from './customer.webp'
import lego1 from './carre_vert_4x4_00.png'

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

        this.state.socket.on("connect", (ws) => {
            console.log("Socket connected")
        });
        
        const getActualState = () => {
            const getState = {
                type: "getState"
            }
            this.state.socket.emit("client", getState)
        }
        getActualState();
        
        this.state.socket.on("arduino", data => {
            console.log("Socket received data from arduino")
            this.loadData(data);
        });
    }
    
    //We only keep the 30 last received data in the state
    loadData(data) {

        console.log("From Arduino: ", data)

        if (data.type === "getState") {
            this.setState({
                open: data.state
            })
        } else if (data.type === "openClose") {
            let newDatas = this.state.datas;
    
            if(this.state.datas.length >= 30) { newDatas.shift(); }
            newDatas.push(data) // ajoute data à la fin du tableau 
            this.setState({
                datas: newDatas,
                open: data.open
            })
        }
    }
    
    switchLight(e){
        //console.log("Click: " + this.state.open);
        const toSend = {
            type: "openClose",
            open: !this.state.open
        }
        this.state.socket.emit("client", toSend);
    }
    
    render() {
        const historic = this.state.datas.map(d => (
            <li key={d._id}>{ new Date(d.date).toUTCString() }: { d.open ? <span className="open"> ouverte </span> : <span className="close"> fermée </span> }</li>
        ))
        
        return (
            <>
            <div className="door">
                <div className="door-img-fall">
                    <div className="door-img-bloc">
                        <img src={lego1} alt="alt"></img>
                    </div>
                    <div className="door-img-bloc">
                        <img src={lego1} alt="alt"></img>
                    </div>
                    <div className="door-img-bloc">
                        <img src={lego1} alt="alt"></img>
                    </div>
                    <div className="door-img-bloc">
                        <img src={lego1} alt="alt"></img>
                    </div>
                    <div className="door-img-bloc">
                        <img src={lego1} alt="alt"></img>
                    </div>
                </div>
                <div className="door-img">
                    <img src={lego} alt="alt"></img>
                </div>
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
            </>
        )
    }
}
