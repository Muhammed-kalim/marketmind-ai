import { TrendingUp, TrendingDown, Minus, Activity, Clock } from 'lucide-react';
import { marketOverview } from '@/data/stockData';

const MarketOverview = () => {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Market Overview
        </h2>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="w-4 h-4" />
          <span>Updated: {marketOverview.lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Stocks */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-muted-foreground text-sm mb-1">Total Stocks</p>
          <p className="text-2xl font-bold text-foreground">{marketOverview.totalStocks}</p>
        </div>

        {/* Bullish */}
        <div className="bg-success/10 rounded-xl p-4 border border-success/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-success" />
            <p className="text-success text-sm">Bullish</p>
          </div>
          <p className="text-2xl font-bold text-success">{marketOverview.bullishCount}</p>
        </div>

        {/* Neutral */}
        <div className="bg-warning/10 rounded-xl p-4 border border-warning/20">
          <div className="flex items-center gap-2 mb-1">
            <Minus className="w-4 h-4 text-warning" />
            <p className="text-warning text-sm">Neutral</p>
          </div>
          <p className="text-2xl font-bold text-warning">{marketOverview.neutralCount}</p>
        </div>

        {/* Bearish */}
        <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <p className="text-destructive text-sm">Bearish</p>
          </div>
          <p className="text-2xl font-bold text-destructive">{marketOverview.bearishCount}</p>
        </div>

        {/* Average Sentiment */}
        <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <p className="text-primary text-sm mb-1">Avg. Sentiment</p>
          <p className="text-2xl font-bold text-primary">{marketOverview.avgSentiment}%</p>
        </div>
      </div>

      {/* Sentiment Gauge */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-destructive">Bearish</span>
          <span className="text-muted-foreground">Market Sentiment</span>
          <span className="text-success">Bullish</span>
        </div>
        <div className="relative h-3 bg-gradient-to-r from-destructive via-warning to-success rounded-full overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 w-1 bg-foreground rounded-full shadow-lg transition-all duration-500"
            style={{ left: `${marketOverview.avgSentiment}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
