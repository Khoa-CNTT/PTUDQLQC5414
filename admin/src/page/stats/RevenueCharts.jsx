import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartBox from './Chartbox';
import { backendUrl } from '../../App';

const RevenueCharts = ({ token }) => {
    const [dayData, setDayData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchData = async () => {
            try {
                const [dayRes, weekRes, monthRes] = await Promise.all([
                    axios.get(`${backendUrl}/api/stats/revenue-by-day`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(`${backendUrl}/api/stats/revenue-by-week`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(`${backendUrl}/api/stats/revenue-by-month`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                setDayData(dayRes.data);
                setWeekData(weekRes.data);
                setMonthData(monthRes.data);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="flex flex-wrap gap-4">
            <ChartBox title="Revenue (Last 7 Days)" dataKey="_id" data={dayData} />
            <ChartBox title="Revenue (Last 4 Weeks)" dataKey="week" data={weekData} />
            <ChartBox title="Revenue (Last 12 Months)" dataKey="month" data={monthData} />
        </div>
    );
};

export default RevenueCharts;
