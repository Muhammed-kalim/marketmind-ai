import { useEffect, useState } from 'react';
import { TrendingUp, Activity, Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setStage(3), 1400),
      setTimeout(() => setStage(4), 2200),
      setTimeout(() => onComplete(), 3500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`,
              animation: `particleFloat ${3 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container */}
        <div className={`relative transition-all duration-1000 ${stage >= 1 ? 'animate-logo-reveal' : 'opacity-0'}`}>
          <div className="relative">
            {/* Glowing ring */}
            <div className={`absolute -inset-8 rounded-full transition-all duration-1000 ${
              stage >= 2 ? 'opacity-100 animate-pulse-glow' : 'opacity-0'
            }`} style={{ background: 'radial-gradient(circle, hsl(186 100% 50% / 0.2), transparent 70%)' }} />
            
            {/* Icon container */}
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-12 h-12 text-primary-foreground" strokeWidth={2.5} />
              
              {/* Orbiting icons */}
              <div className={`absolute -right-3 -top-3 transition-all duration-500 ${stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-4 h-4 text-success-foreground" />
                </div>
              </div>
              <div className={`absolute -left-3 -bottom-3 transition-all duration-500 delay-200 ${stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className={`mt-8 text-center transition-all duration-700 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider">
            <span className={`inline-block ${stage >= 2 ? 'animate-text-reveal' : ''}`}>
              <span className="gradient-text">MARKET</span>
              <span className="text-foreground">MIND</span>
            </span>
          </h1>
          
          {/* Animated line */}
          <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto overflow-hidden">
            <div className={`h-full bg-primary ${stage >= 3 ? 'animate-line-expand' : 'w-0'}`} />
          </div>
          
          <p className={`mt-4 text-muted-foreground tracking-widest text-sm transition-all duration-500 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            AI-POWERED SENTIMENT ANALYSIS
          </p>
        </div>

        {/* Loading indicators */}
        <div className={`mt-12 flex items-center gap-4 transition-all duration-500 ${
          stage >= 4 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce-subtle"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">Initializing AI Engine...</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
    </div>
  );
};

export default SplashScreen;
