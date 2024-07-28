import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#888888']; // Adding a color for "Others"

const DonutChart = ({ data }) => {
    // Sort data by value
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    // Take the top 5 categories
    const top5Data = sortedData.slice(0, 5);
    // Sum the remaining categories as "Others"
    const othersValue = sortedData.slice(5).reduce((acc, item) => acc + item.value, 0);

    // Add "Others" to the data if there are more than 5 categories
    if (sortedData.length > 5) {
        top5Data.push({ name: 'Others', value: othersValue });
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={top5Data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={70}
                    label
                >
                    {top5Data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DonutChart;
