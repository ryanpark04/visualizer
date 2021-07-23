import React, { useState } from 'react';
import { Checkbox, Loader } from 'semantic-ui-react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const DeviceToggles = ({ db, sensor, handleDeviceChange }) => {
    const [selectedDevices, setSelectedDevices] = useState([]);

    const query = db.collection('sensors').doc(sensor).collection('values').orderBy('createdAt');

    const [values, loading, error] = useCollectionData(query);


    const devices = values === undefined ? [] : [...new Set(values.map(value => value.device))];
        // const deviceMap = new Map();
        // if (deviceMap.has(value.device)) {
        //     deviceMap.get(value.device).push(value.value);
        // } else {
        //     deviceMap.set(value.device, [value.value]);
        // }

    console.log('rerender');

    const renderedList = devices.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }).map((device) => { 
        return (
            <div key={device}>
                <Checkbox 
                    toggle
                    defaultChecked={true}
                    label={device}
                    onChange={(e, data) => {
                        console.log(data);
                        // const filteredArray = selectedDevices.filter(device => device !== data.value)
                        // selectedDevices.splice(selectedDevices.indexOf(data.value), 1);
                    }}
                />
            </div>
        );
    });

    
    return (
        <div>
            {loading ? <Loader active inline size={'tiny'} /> : (renderedList.length === 0 ? 'No devices listed' : renderedList)}
        </div>
    );
}

export default DeviceToggles;
