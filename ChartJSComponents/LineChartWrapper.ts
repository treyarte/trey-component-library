
import {Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, LinearScale, PointElement, LineElement, Title, ChartOptions, ChartData} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

/**
 * A single data in a chart
 */
export type DataPoint = {
    label:string;
    value:number;
}

type props = {
    dataPoints:DataPoint[];
    showLabel:boolean;
    showTitle:boolean;
}

ChartJS.register(LinearScale,CategoryScale, PointElement, LineElement, Title, Tooltip, Legend )

/**
 * Component for displaying a line chart. This component will need to be 
 * inside of a container that have a set height or else the chart will keep expanding 
 */
export default function LineChart({dataPoints, showLabel, showTitle}:props) {
    
    /**
     * A set of options for controlling our line chart
     */
    const options:ChartOptions<'line'> = {
        responsive:true,
        plugins: {
            legend: {
                display: showLabel,
            },
            title: {
                display:showTitle,
            }
        }
    };

    /**
     * Data that will be used inside the chart, we are memoizing it bc 
     * we don't want to have to map over the data on over rerender
     */
    const data:ChartData<'line'> = useMemo(() => (
        {
            labels: dataPoints.map(d => d.label),
            datasets: [
                {     
                    label: "",          
                    data: dataPoints.map(d => d.value),
                    fill:true,
                    borderColor: 'rgb(75, 192, 192)',
                    pointStyle: false,
                    tension: 0.1
                }
            ]
        }
    ), [dataPoints]); 

    return (
        <Line data={data} options={options}/> 
    )
}