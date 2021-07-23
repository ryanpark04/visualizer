import React from 'react';
import Chart from './components/Chart';
import SensorDropdown from './components/SensorDropdown';
import DeviceToggles from './components/DeviceToggles';

import firebase from 'firebase';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBl6Ppn1I6UgN8lwpwbPy-aceEX29SZ71E",
        authDomain: "visualizer-ae6f4.firebaseapp.com",
        projectId: "visualizer-ae6f4",
        storageBucket: "visualizer-ae6f4.appspot.com",
        messagingSenderId: "614578131681",
        appId: "1:614578131681:web:e58c5310b230b116841da0"
        
    });
}

const db = firebase.firestore();

class App extends React.Component {
    state = {
        selectedSensor: '',
        selectedDevice: ''
    }

    renderDeviceDropdown = () => {
        return (
            this.state.selectedSensor ? 
                <DeviceToggles 
                    db={db} 
                    sensor={this.state.selectedSensor} 
                    handleDeviceSelect={
                        device => this.setState({ selectedDevice: device })
                    } 
                /> :
                null
        );
        
        
    }

    render() {
        return(
            <div>  
                <Chart db={db} sensor={this.state.selectedSensor} />
                <SensorDropdown db={db} handleSensorSelect={sensor => this.setState({ selectedSensor: sensor })} />
                {this.renderDeviceDropdown()}
            </div>
        );
    }
}

export default App;