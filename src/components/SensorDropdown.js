import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const SensorDropdown = ({ db, handleSensorSelect }) =>  {
    const [selectedSensor, setSelectedSensor] = useState('');

    const query = db.collection('sensors').orderBy('value');
    const [values, loading, error] = useCollectionData(query);

    const onSensorSelect = (sensor) => {
        setSelectedSensor(sensor);
        handleSensorSelect(sensor);
    }

    return(
        <div>
            <Dropdown
                placeholder='Select Sensor'
                selection
                options={values || []}
                loading={loading}
                onChange={(e, data) => {onSensorSelect(data.value)}}
            />
        </div>
    );
}

export default SensorDropdown;