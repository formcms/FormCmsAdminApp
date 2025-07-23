import React, {useState, useEffect} from 'react';
import {Chart} from 'primereact/chart';

export interface StackedBarProps {
    header: string;
    xLabels: string[] | undefined;
    yData: {
        label: string
        data: number[];
    }[] | undefined
}

export function StackedBar(
    {
        header,
        xLabels,
        yData
    }: StackedBarProps
) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const colors = [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--grey-500'),
            documentStyle.getPropertyValue('--purple-500') // New color added
        ];
        const datasets = yData && yData.map((item, idx) => ({
            type: 'bar',
            label: item.label,
            backgroundColor: colors[idx % colors.length],
            borderColor: colors[idx % colors.length],
            data: item.data,
        }));

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData({xLabels: xLabels, datasets});
        setChartOptions(options);
    }, [yData, xLabels]);

    return (
        <div className="card">
            <h4>{header}</h4>
            <Chart type="bar" data={chartData} options={chartOptions} id={header}/>
        </div>
    )
}
