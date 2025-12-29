import { TrendingUp, TrendingDown, Newspaper, BarChart3 } from 'lucide-react';
import { Stock } from '@/data/stockData';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
  index: number;
}

const StockCard = ({ stock, onClick, index }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  const sentimentClass = stock.sentimentScore >= 70 
    ? 'sentiment-bullish' 
    : stock.sentimentScore >= 50 
      ? 'sentiment-neutral' 
      : 'sentiment-bearish';

  const sentimentColor = stock.sentimentScore >= 70 
    ? 'text-success' 
    : stock.sentimentScore >= 50 
      ? 'text-warning' 
      : 'text-destructive';

  const sentimentBg = stock.sentimentScore >= 70 
    ? 'bg-success/10' 
    : stock.sentimentScore >= 50 
      ? 'bg-warning/10' 
      : 'bg-destructive/10';

  return (
    <div 
      className={cn(
        "glass-card-hover p-5 cursor-pointer opacity-0 animate-slide-up",
        sentimentClass
      )}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-lg text-foreground">{stock.symbol}</h3>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              sentimentBg,
              sentimentColor
            )}>
              {stock.sector}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-0.5">{stock.name}</p>
        </div>
        
        {/* Sentiment Score */}
        <div className={cn(
          "relative w-14 h-14 rounded-xl flex items-center justify-center",
          sentimentBg
        )}>
          <span className={cn("font-display font-bold text-xl", sentimentColor)}>
            {stock.sentimentScore}
          </span>
          <span className={cn("absolute -bottom-1 text-[10px] font-medium", sentimentColor)}>
            %
          </span>
        </div>
      </div>

      {/* Price section */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-2xl font-bold text-foreground">
            ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <div className={cn(
            "flex items-center gap-1 mt-1",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Mini chart representation */}
        <div className="flex items-end gap-0.5 h-10">
          {stock.historicalSentiment.slice(-7).map((value, i) => (
            <div
              key={i}
              className={cn(
                "w-2 rounded-sm transition-all duration-300",
                value >= 70 ? "bg-success" : value >= 50 ? "bg-warning" : "bg-destructive"
              )}
              style={{ height: `${(value / 100) * 40}px` }}
            />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <BarChart3 className="w-4 h-4" />
          <span>Vol: {stock.volume}</span>
        </div>
        <div className="text-muted-foreground">
          MCap: {stock.marketCap}
        </div>
      </div>

      {/* News headline */}
      <div className="flex items-start gap-2 pt-3 border-t border-border/50">
        <Newspaper className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {stock.headline}
        </p>
      </div>

      {/* Accuracy indicator */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">AI Accuracy</span>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${stock.accuracy}%` }}
            />
          </div>
          <span className="text-primary font-medium">{stock.accuracy}%</span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
