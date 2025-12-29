import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { stocksData, Stock } from '@/data/stockData';
import { Bot, Power, TrendingUp, TrendingDown, Settings, AlertTriangle, Zap, Target, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const AutoTradePage = () => {
  const [stocks, setStocks] = useState<Stock[]>(stocksData);
  const [globalEnabled, setGlobalEnabled] = useState(false);
  const [minAccuracy, setMinAccuracy] = useState([80]);
  const [minSentiment, setMinSentiment] = useState([70]);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const toggleStock = (symbol: string) => {
    setStocks(prev => prev.map(stock => 
      stock.symbol === symbol 
        ? { ...stock, autoTradeEnabled: !stock.autoTradeEnabled }
        : stock
    ));
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      toast.success(`Auto-trading ${stock.autoTradeEnabled ? 'disabled' : 'enabled'} for ${symbol}`);
    }
  };

  const enabledCount = stocks.filter(s => s.autoTradeEnabled).length;
  const eligibleStocks = stocks.filter(s => s.accuracy >= minAccuracy[0] && s.sentimentScore >= minSentiment[0]);

  const toggleGlobal = () => {
    setGlobalEnabled(!globalEnabled);
    if (!globalEnabled) {
      toast.success('Auto-trading system activated', {
        description: `Monitoring ${enabledCount} stocks with AI-powered signals`,
      });
    } else {
      toast.info('Auto-trading system paused');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Bot className="w-8 h-8 text-primary" />
                Auto Trade
              </h1>
              <p className="text-muted-foreground">
                AI-powered automated trading based on sentiment accuracy
              </p>
            </div>
            <Button
              onClick={toggleGlobal}
              className={cn(
                "gap-3 h-14 px-8 rounded-xl font-semibold text-lg transition-all duration-300",
                globalEnabled 
                  ? "bg-success hover:bg-success/90 text-success-foreground glow-success" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
            >
              <Power className={cn("w-5 h-5", globalEnabled && "animate-pulse")} />
              {globalEnabled ? 'System Active' : 'Activate System'}
            </Button>
          </div>
        </AnimatedSection>

        {/* Warning Banner */}
        <AnimatedSection className="mb-8" delay={100}>
          <div className="glass-card p-4 border-l-4 border-l-warning bg-warning/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Disclaimer</p>
                <p className="text-sm text-muted-foreground">
                  Auto-trading is simulated for demonstration purposes. Real trading involves significant risk. 
                  Always consult a financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Settings Panel */}
          <AnimatedSection delay={200}>
            <div className="glass-card p-6 h-full">
              <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Trading Parameters
              </h2>

              <div className="space-y-6">
                {/* Minimum Accuracy */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Min. Accuracy
                    </label>
                    <span className="text-primary font-bold">{minAccuracy[0]}%</span>
                  </div>
                  <Slider
                    value={minAccuracy}
                    onValueChange={setMinAccuracy}
                    min={50}
                    max={95}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Minimum Sentiment */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4 text-success" />
                      Min. Sentiment
                    </label>
                    <span className="text-success font-bold">{minSentiment[0]}%</span>
                  </div>
                  <Slider
                    value={minSentiment}
                    onValueChange={setMinSentiment}
                    min={30}
                    max={90}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Risk Level */}
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-accent" />
                    Risk Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setRiskLevel(level)}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium capitalize transition-all",
                          riskLevel === level
                            ? level === 'low' ? "bg-success text-success-foreground" :
                              level === 'medium' ? "bg-warning text-warning-foreground" :
                              "bg-destructive text-destructive-foreground"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eligible Stocks Counter */}
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Eligible Stocks</span>
                    <span className="font-display font-bold text-primary text-xl">
                      {eligibleStocks.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Status Panel */}
          <AnimatedSection delay={300}>
            <div className="glass-card p-6 h-full">
              <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-success" />
                System Status
              </h2>

              <div className="space-y-4">
                <div className={cn(
                  "p-4 rounded-xl transition-all",
                  globalEnabled ? "bg-success/10 border border-success/30" : "bg-secondary/50"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      globalEnabled ? "bg-success animate-pulse" : "bg-muted-foreground"
                    )} />
                    <span className="font-medium text-foreground">
                      {globalEnabled ? 'Trading Active' : 'System Idle'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-display font-bold text-foreground">{enabledCount}</p>
                    <p className="text-sm text-muted-foreground">Active Stocks</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-display font-bold text-primary">0</p>
                    <p className="text-sm text-muted-foreground">Today's Trades</p>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground text-sm">Simulated P/L</span>
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-display font-bold text-success">+₹0.00</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Quick Stats */}
          <AnimatedSection delay={400}>
            <div className="glass-card p-6 h-full">
              <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Performance
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="font-bold text-success">--</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Avg. Return</span>
                  <span className="font-bold text-foreground">--</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Best Trade</span>
                  <span className="font-bold text-success">--</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Total Trades</span>
                  <span className="font-bold text-foreground">0</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stock Selection */}
        <AnimatedSection delay={500}>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Select Stocks for Auto-Trading
              </h2>
              <p className="text-sm text-muted-foreground">
                {enabledCount} of {stocks.length} enabled
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {stocks.map((stock, index) => {
                const isEligible = stock.accuracy >= minAccuracy[0] && stock.sentimentScore >= minSentiment[0];
                return (
                  <div 
                    key={stock.symbol}
                    className={cn(
                      "p-4 rounded-xl border transition-all opacity-0 animate-slide-up",
                      stock.autoTradeEnabled 
                        ? "bg-primary/10 border-primary/30" 
                        : "bg-secondary/50 border-border/50",
                      !isEligible && "opacity-50"
                    )}
                    style={{ animationDelay: `${index * 0.03 + 0.5}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-foreground">{stock.symbol}</span>
                        {!isEligible && (
                          <span className="text-xs text-muted-foreground">(Not eligible)</span>
                        )}
                      </div>
                      <Switch
                        checked={stock.autoTradeEnabled}
                        onCheckedChange={() => toggleStock(stock.symbol)}
                        disabled={!isEligible}
                      />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{stock.name}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-primary" />
                        <span className={cn(
                          stock.accuracy >= minAccuracy[0] ? "text-success" : "text-destructive"
                        )}>
                          {stock.accuracy}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-success" />
                        <span className={cn(
                          stock.sentimentScore >= minSentiment[0] ? "text-success" : "text-destructive"
                        )}>
                          {stock.sentimentScore}%
                        </span>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1",
                        stock.change >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AutoTradePage;
