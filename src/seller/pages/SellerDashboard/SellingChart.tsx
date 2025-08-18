import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchRevenueChart } from '../../../State/seller/revenueChartSlice';

// Define prop types
interface SellingChartProps {
  chartType: string;
}

const SellingChart: React.FC<SellingChartProps> = ({ chartType }) => {
  const dispatch = useAppDispatch();
  const { revenueChart } = useAppSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (chartType && jwt) {
      dispatch(fetchRevenueChart({ type: chartType, jwt }));
    }
  }, [chartType, dispatch]);

  if (revenueChart.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Loading chart data...</div>
      </div>
    );
  }

  if (revenueChart.error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error loading chart: {revenueChart.error}</div>
      </div>
    );
  }

  if (!revenueChart.chart || revenueChart.chart.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">No data available for the selected period</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={revenueChart.chart}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
        <XAxis dataKey="date" stroke="#FFFFFF" tick={{ fill: '#FFFFFF' }} />
        <YAxis dataKey="revenue" stroke="#FFFFFF" tick={{ fill: '#FFFFFF' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1A1A1A',
            border: '1px solid #404040',
            borderRadius: '4px',
            color: '#FFFFFF'
          }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SellingChart;
