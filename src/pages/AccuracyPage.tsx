import AnimatedSection from '@/components/AnimatedSection';
import { stocksData } from '@/data/stockData';
import { Target, TrendingUp, TrendingDown, Award, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AccuracyPage = () => {
  const sortedByAccuracy = [...stocksData].sort((a, b) => b.accuracy - a.accuracy);
  const avgAccuracy = Math.round(stocksData.reduce((acc, s) => acc + s.accuracy, 0) / stocksData.length);
  
  const accuracyDistribution = [
    { name: 'Excellent (>85%)', value: stocksData.filter(s => s.accuracy > 85).length, color: 'hsl(142, 76%, 45%)' },
    { name: 'Good (70-85%)', value: stocksData.filter(s => s.accuracy >= 70 && s.accuracy <= 85).length, color: 'hsl(186, 100%, 50%)' },
    { name: 'Fair (<70%)', value: stocksData.filter(s => s.accuracy < 70).length, color: 'hsl(45, 93%, 55%)' },
  ];

  const barChartData = stocksData.map(s => ({
    symbol: s.symbol,
    accuracy: s.accuracy,
    sentiment: s.sentimentScore,
  }));

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Target className="w-8 h-8 text-primary" />
            AI Accuracy Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor the prediction accuracy of our AI sentiment analysis
          </p>
        </AnimatedSection>

        {/* Stats Overview */}
        <AnimatedSection className="mb-8" delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card p-6 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-4xl font-display font-bold text-foreground">{avgAccuracy}%</p>
              <p className="text-muted-foreground mt-1">Average Accuracy</p>
            </div>
            <div className="glass-card p-6 text-center">
              <TrendingUp className="w-8 h-8 text-success mx-auto mb-3" />
              <p className="text-4xl font-display font-bold text-success">{sortedByAccuracy[0].accuracy}%</p>
              <p className="text-muted-foreground mt-1">Best: {sortedByAccuracy[0].symbol}</p>
            </div>
            <div className="glass-card p-6 text-center">
              <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-4xl font-display font-bold text-foreground">{stocksData.length}</p>
              <p className="text-muted-foreground mt-1">Tracked Stocks</p>
            </div>
            <div className="glass-card p-6 text-center">
              <Target className="w-8 h-8 text-warning mx-auto mb-3" />
              <p className="text-4xl font-display font-bold text-warning">7</p>
              <p className="text-muted-foreground mt-1">Days Analyzed</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Accuracy Distribution Pie Chart */}
          <AnimatedSection delay={200}>
            <div className="glass-card p-6 h-[400px]">
              <h2 className="font-display font-bold text-xl text-foreground mb-4">Accuracy Distribution</h2>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={accuracyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {accuracyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 8%)',
                      border: '1px solid hsl(222, 47%, 18%)',
                      borderRadius: '12px',
                      color: 'hsl(210, 40%, 98%)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Accuracy Bar Chart */}
          <AnimatedSection delay={300}>
            <div className="glass-card p-6 h-[400px]">
              <h2 className="font-display font-bold text-xl text-foreground mb-4">Accuracy by Stock</h2>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={barChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(215, 20%, 55%)" />
                  <YAxis dataKey="symbol" type="category" width={80} stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 8%)',
                      border: '1px solid hsl(222, 47%, 18%)',
                      borderRadius: '12px',
                      color: 'hsl(210, 40%, 98%)',
                    }}
                  />
                  <Bar dataKey="accuracy" fill="hsl(186, 100%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>

        {/* Leaderboard */}
        <AnimatedSection delay={400}>
          <div className="glass-card p-6">
            <h2 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Accuracy Leaderboard
            </h2>
            <div className="space-y-3">
              {sortedByAccuracy.map((stock, index) => (
                <div 
                  key={stock.symbol}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl transition-all",
                    index === 0 ? "bg-primary/10 border border-primary/30" :
                    index === 1 ? "bg-accent/10 border border-accent/30" :
                    index === 2 ? "bg-warning/10 border border-warning/30" :
                    "bg-secondary/50"
                  )}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm",
                    index === 0 ? "bg-primary text-primary-foreground" :
                    index === 1 ? "bg-accent text-accent-foreground" :
                    index === 2 ? "bg-warning text-warning-foreground" :
                    "bg-secondary text-foreground"
                  )}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-foreground">{stock.symbol}</span>
                      <span className="text-muted-foreground text-sm">{stock.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={stock.change >= 0 ? "text-success" : "text-destructive"}>
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-24">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className={cn(
                          "font-medium",
                          stock.accuracy > 85 ? "text-success" :
                          stock.accuracy >= 70 ? "text-primary" : "text-warning"
                        )}>{stock.accuracy}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            stock.accuracy > 85 ? "bg-success" :
                            stock.accuracy >= 70 ? "bg-primary" : "bg-warning"
                          )}
                          style={{ width: `${stock.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AccuracyPage;
