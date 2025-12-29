import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface SentimentChartProps {
  data: number[];
  symbol: string;
}

const SentimentChart = ({ data, symbol }: SentimentChartProps) => {
  const chartData = data.map((value, index) => ({
    day: `Day ${index + 1}`,
    sentiment: value,
  }));

  const getColor = (value: number) => {
    if (value >= 70) return 'hsl(142, 76%, 45%)';
    if (value >= 50) return 'hsl(45, 93%, 55%)';
    return 'hsl(0, 84%, 60%)';
  };

  const lastValue = data[data.length - 1];
  const color = getColor(lastValue);

  return (
    <div className="glass-card p-6 h-80">
      <h3 className="font-display font-bold text-lg mb-4 text-foreground">
        {symbol} - 7 Day Sentiment Trend
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={12}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 8%)',
              border: '1px solid hsl(222, 47%, 18%)',
              borderRadius: '12px',
              color: 'hsl(210, 40%, 98%)',
            }}
            labelStyle={{ color: 'hsl(215, 20%, 55%)' }}
          />
          <Area
            type="monotone"
            dataKey="sentiment"
            stroke={color}
            strokeWidth={3}
            fill={`url(#gradient-${symbol})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
