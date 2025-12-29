import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search stocks by symbol or name..." }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-3 w-full max-w-2xl animate-fade-in">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-4 h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
      <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-border/50 hover:bg-secondary hover:border-primary/50">
        <Filter className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
