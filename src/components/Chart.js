import React from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chart = ({ db }) => {
    const ref = db.collection('sensors').doc('gpuPrecision').collection('values');
    const query = ref.orderBy('createdAt');

    const [values, loading, error] = useCollectionData(query);

    const options = {
        chart: {
            animation: false,
            zoomType: 'x'
        },
        title: {
            text: 'Test'
        },
        series: [
            {
                showInLegend: true,
                type: 'line',
                data: ((values === undefined)) ? [] : values.map(obj => obj.value),
                marker: {
                    enabled: false
                },
                showInNavigator: true
            },
            {
                showInLegend: true,
                type: 'line',
                data: [176, 180, 181, 180, 179, 181, 181, 180, 180, 179, 180, 180, 183, 180, 180, 178, 180, 182, 180, 182, 177, 182, 180, 180, 178, 182, 176, 184, 178, 183, 178, 181, 181, 180, 180, 179, 178, 182, 180, 181, 180, 179, 180, 180, 180, 180, 180, 180, 180, 179, 181, 178, 182, 180, 180, 180, 179, 181, 180, 179, 177, 183, 180, 180, 180, 181, 179, 177, 183, 179, 182, 181, 180, 180, 180, 180, 180, 180, 180, 179, 179, 180, 182, 177, 179, 181, 178, 181, 179, 180, 180, 180, 181, 180, 180, 179, 181, 179, 180],
                marker: {
                    enabled: false
                },
                showInNavigator: true
            }
        ],
        line: {
            marker: {
                enabled: false
            }
        }, 
        xAxis: {
            visible: false
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            adaptToUpdatedData: true,
            xAxis: {
                labels: {
                    enabled: false
                },
            },
            series: {
                type: 'line'
            }

        },
        legend: {
            enabled: true
        }
    }

    const renderedList = ((values === undefined)) ? [] : values.map((obj) => {
        return (
            <div key={obj.device}>
                {obj.value}
            </div>
        );
    })
    

    return (
        <div>  
            <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </div>
        
    );
}

export default Chart;