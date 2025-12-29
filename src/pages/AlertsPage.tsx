import { useState } from 'react';
import { Bell, TrendingUp, TrendingDown, Newspaper, BarChart3, Check, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { alertsData, Alert } from '@/data/stockData';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(alertsData);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'sentiment':
        return TrendingUp;
      case 'price':
        return TrendingDown;
      case 'volume':
        return BarChart3;
      case 'news':
        return Newspaper;
      default:
        return Bell;
    }
  };

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-l-destructive bg-destructive/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-primary bg-primary/5';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedSection className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                Alerts
                {unreadCount > 0 && (
                  <span className="ml-2 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-sm font-medium">
                    {unreadCount} new
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground">
                Stay updated with real-time market alerts
              </p>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                onClick={markAllAsRead}
                className="gap-2 border-border/50"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </AnimatedSection>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <AnimatedSection>
              <div className="glass-card p-12 text-center">
                <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  No alerts yet
                </h3>
                <p className="text-muted-foreground">
                  When important market events occur, you'll see them here
                </p>
              </div>
            </AnimatedSection>
          ) : (
            alerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <AnimatedSection key={alert.id} delay={index * 50}>
                  <div className={cn(
                    "glass-card p-5 border-l-4 transition-all duration-300",
                    getSeverityStyles(alert.severity),
                    !alert.read && "ring-1 ring-primary/30"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        alert.severity === 'high' ? 'bg-destructive/20' :
                        alert.severity === 'medium' ? 'bg-warning/20' : 'bg-primary/20'
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          alert.severity === 'high' ? 'text-destructive' :
                          alert.severity === 'medium' ? 'text-warning' : 'text-primary'
                        )} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-display font-bold text-foreground">
                            {alert.symbol}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            alert.type === 'sentiment' && 'bg-primary/10 text-primary',
                            alert.type === 'price' && 'bg-success/10 text-success',
                            alert.type === 'volume' && 'bg-accent/10 text-accent',
                            alert.type === 'news' && 'bg-warning/10 text-warning'
                          )}>
                            {alert.type}
                          </span>
                          {alert.severity === 'high' && (
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          )}
                          {!alert.read && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <p className="text-foreground mb-2">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(alert.id)}
                            className="text-muted-foreground hover:text-success"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteAlert(alert.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
