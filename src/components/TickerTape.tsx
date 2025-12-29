import { TrendingUp, TrendingDown } from 'lucide-react';
import { stocksData } from '@/data/stockData';
import { cn } from '@/lib/utils';

const TickerTape = () => {
  // Duplicate for seamless scrolling
  const tickers = [...stocksData, ...stocksData];

  return (
    <div className="w-full bg-secondary/50 border-y border-border/50 py-2 overflow-hidden">
      <div className="ticker-tape">
        {tickers.map((stock, index) => {
          const isPositive = stock.change >= 0;
          return (
            <div 
              key={`${stock.symbol}-${index}`}
              className="flex items-center gap-3 px-4 flex-shrink-0"
            >
              <span className="font-display font-semibold text-foreground">
                {stock.symbol}
              </span>
              <span className="text-muted-foreground">
                ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <div className={cn(
                "flex items-center gap-1",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">
                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="w-px h-4 bg-border/50" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TickerTape;
