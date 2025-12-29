import { useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import MarketOverview from '@/components/MarketOverview';
import TickerTape from '@/components/TickerTape';
import StockCard from '@/components/StockCard';
import SentimentChart from '@/components/SentimentChart';
import AnimatedSection from '@/components/AnimatedSection';
import { stocksData, Stock } from '@/data/stockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, BarChart3, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return stocksData;
    const query = searchQuery.toLowerCase();
    return stocksData.filter(
      stock =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query) ||
        stock.sector.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Ticker Tape */}
      <TickerTape />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <AnimatedSection className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Live Sentiment Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time AI-powered sentiment analysis across Indian markets
              </p>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </AnimatedSection>

        {/* Market Overview */}
        <AnimatedSection className="mb-8" delay={100}>
          <MarketOverview />
        </AnimatedSection>

        {/* Stock Grid */}
        <AnimatedSection delay={200}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-foreground">
              Tracked Stocks ({filteredStocks.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-success" /> Bullish
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-warning" /> Neutral
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-destructive" /> Bearish
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredStocks.map((stock, index) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                index={index}
                onClick={() => setSelectedStock(stock)}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Empty state */}
        {filteredStocks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No stocks found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Stock Detail Modal */}
      <Dialog open={!!selectedStock} onOpenChange={() => setSelectedStock(null)}>
        <DialogContent className="glass-card max-w-3xl border-border/50">
          {selectedStock && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <span className="font-display text-2xl font-bold text-foreground">
                    {selectedStock.symbol}
                  </span>
                  <span className="text-muted-foreground font-normal">
                    {selectedStock.name}
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-muted-foreground text-sm mb-1">Price</p>
                  <p className="text-xl font-bold text-foreground">
                    ₹{selectedStock.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className={cn(
                  "rounded-xl p-4",
                  selectedStock.change >= 0 ? "bg-success/10" : "bg-destructive/10"
                )}>
                  <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
                    {selectedStock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    Change
                  </p>
                  <p className={cn(
                    "text-xl font-bold",
                    selectedStock.change >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-primary/10 rounded-xl p-4">
                  <p className="text-muted-foreground text-sm mb-1">Sentiment</p>
                  <p className="text-xl font-bold text-primary">{selectedStock.sentimentScore}%</p>
                </div>
                <div className="bg-accent/10 rounded-xl p-4">
                  <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Accuracy
                  </p>
                  <p className="text-xl font-bold text-accent">{selectedStock.accuracy}%</p>
                </div>
              </div>

              <div className="mt-6">
                <SentimentChart data={selectedStock.historicalSentiment} symbol={selectedStock.symbol} />
              </div>

              <div className="mt-4 p-4 bg-secondary/50 rounded-xl">
                <div className="flex items-start gap-2">
                  <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Latest News</p>
                    <p className="text-muted-foreground">{selectedStock.headline}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
