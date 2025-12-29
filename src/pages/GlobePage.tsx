import GlobeVisualization from '@/components/GlobeVisualization';
import AnimatedSection from '@/components/AnimatedSection';
import { stocksData } from '@/data/stockData';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const GlobePage = () => {
  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Global Market View
          </h1>
          <p className="text-muted-foreground">
            Interactive 3D visualization of stock sentiment across locations
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Globe */}
          <AnimatedSection className="xl:col-span-3" delay={100}>
            <div className="glass-card p-4 h-[600px]">
              <GlobeVisualization />
            </div>
          </AnimatedSection>

          {/* Stock List */}
          <AnimatedSection className="xl:col-span-1" delay={200}>
            <div className="glass-card p-5 h-[600px] overflow-hidden flex flex-col">
              <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Market Locations
              </h2>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {stocksData.map((stock, index) => {
                  const isPositive = stock.change >= 0;
                  const sentimentColor = stock.sentimentScore >= 70 
                    ? 'bg-success' 
                    : stock.sentimentScore >= 50 
                      ? 'bg-warning' 
                      : 'bg-destructive';

                  return (
                    <div 
                      key={stock.symbol}
                      className="bg-secondary/50 rounded-xl p-4 transition-all hover:bg-secondary cursor-pointer opacity-0 animate-slide-up"
                      style={{ animationDelay: `${index * 0.05 + 0.3}s`, animationFillMode: 'forwards' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={cn("w-2 h-2 rounded-full", sentimentColor)} />
                          <span className="font-display font-semibold text-foreground">
                            {stock.symbol}
                          </span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 text-sm",
                          isPositive ? "text-success" : "text-destructive"
                        )}>
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className="text-muted-foreground">{stock.country}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full",
                          stock.sentimentScore >= 70 
                            ? 'bg-success/10 text-success' 
                            : stock.sentimentScore >= 50 
                              ? 'bg-warning/10 text-warning' 
                              : 'bg-destructive/10 text-destructive'
                        )}>
                          {stock.sentimentScore}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Legend */}
        <AnimatedSection className="mt-6" delay={300}>
          <div className="glass-card p-4">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Bullish (&gt;70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">Neutral (50-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">Bearish (&lt;50%)</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default GlobePage;
