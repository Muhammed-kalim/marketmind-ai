export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sentimentScore: number;
  volume: string;
  marketCap: string;
  headline: string;
  sector: string;
  country: string;
  coordinates: [number, number];
  historicalSentiment: number[];
  accuracy: number;
  autoTradeEnabled: boolean;
}

export const stocksData: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2847.50,
    change: 45.30,
    changePercent: 1.62,
    sentimentScore: 78,
    volume: "12.5M",
    marketCap: "₹19.2L Cr",
    headline: "Jio's 5G expansion accelerates with new spectrum acquisition",
    sector: "Energy",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [72, 74, 71, 76, 78, 75, 78],
    accuracy: 87,
    autoTradeEnabled: false
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy",
    price: 4125.80,
    change: -28.40,
    changePercent: -0.68,
    sentimentScore: 65,
    volume: "3.2M",
    marketCap: "₹15.1L Cr",
    headline: "TCS wins $500M digital transformation deal with European bank",
    sector: "Technology",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [68, 66, 64, 67, 65, 63, 65],
    accuracy: 82,
    autoTradeEnabled: false
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: 1678.25,
    change: 22.15,
    changePercent: 1.34,
    sentimentScore: 72,
    volume: "8.7M",
    marketCap: "₹12.8L Cr",
    headline: "HDFC Bank reports strong Q3 results, NII up 25%",
    sector: "Banking",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [70, 69, 72, 74, 71, 73, 72],
    accuracy: 85,
    autoTradeEnabled: false
  },
  {
    symbol: "INFY",
    name: "Infosys",
    price: 1567.90,
    change: 18.50,
    changePercent: 1.19,
    sentimentScore: 68,
    volume: "5.4M",
    marketCap: "₹6.5L Cr",
    headline: "Infosys announces AI-first strategy with new generative AI platform",
    sector: "Technology",
    country: "India",
    coordinates: [77.5946, 12.9716],
    historicalSentiment: [65, 67, 66, 69, 70, 68, 68],
    accuracy: 79,
    autoTradeEnabled: false
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    price: 1089.45,
    change: -12.80,
    changePercent: -1.16,
    sentimentScore: 45,
    volume: "9.1M",
    marketCap: "₹7.6L Cr",
    headline: "ICICI Bank faces regulatory scrutiny over loan practices",
    sector: "Banking",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [52, 48, 46, 45, 47, 44, 45],
    accuracy: 76,
    autoTradeEnabled: false
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors",
    price: 987.30,
    change: 42.60,
    changePercent: 4.51,
    sentimentScore: 85,
    volume: "15.8M",
    marketCap: "₹3.6L Cr",
    headline: "Tata Motors EV sales surge 150% YoY, market share expands",
    sector: "Automobile",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [78, 80, 82, 84, 83, 85, 85],
    accuracy: 91,
    autoTradeEnabled: false
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    price: 1456.75,
    change: 28.90,
    changePercent: 2.02,
    sentimentScore: 74,
    volume: "6.3M",
    marketCap: "₹8.7L Cr",
    headline: "Airtel 5G network reaches 5000 cities, fastest rollout globally",
    sector: "Telecom",
    country: "India",
    coordinates: [77.2090, 28.6139],
    historicalSentiment: [70, 72, 73, 74, 75, 73, 74],
    accuracy: 84,
    autoTradeEnabled: false
  },
  {
    symbol: "WIPRO",
    name: "Wipro Ltd",
    price: 478.50,
    change: -8.20,
    changePercent: -1.69,
    sentimentScore: 42,
    volume: "4.1M",
    marketCap: "₹2.5L Cr",
    headline: "Wipro faces headwinds as IT spending slowdown continues",
    sector: "Technology",
    country: "India",
    coordinates: [77.5946, 12.9716],
    historicalSentiment: [48, 46, 44, 43, 42, 43, 42],
    accuracy: 73,
    autoTradeEnabled: false
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 789.40,
    change: 15.60,
    changePercent: 2.02,
    sentimentScore: 71,
    volume: "18.2M",
    marketCap: "₹7.0L Cr",
    headline: "SBI posts record quarterly profit, asset quality improves",
    sector: "Banking",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [68, 69, 70, 71, 70, 72, 71],
    accuracy: 86,
    autoTradeEnabled: false
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    price: 1234.80,
    change: 32.40,
    changePercent: 2.70,
    sentimentScore: 76,
    volume: "3.8M",
    marketCap: "₹2.9L Cr",
    headline: "Sun Pharma gets FDA approval for new specialty drug",
    sector: "Healthcare",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [72, 73, 74, 75, 76, 75, 76],
    accuracy: 88,
    autoTradeEnabled: false
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints",
    price: 2876.50,
    change: -45.80,
    changePercent: -1.57,
    sentimentScore: 38,
    volume: "1.9M",
    marketCap: "₹2.7L Cr",
    headline: "Asian Paints margins under pressure from rising input costs",
    sector: "Consumer",
    country: "India",
    coordinates: [72.8777, 19.0760],
    historicalSentiment: [45, 42, 40, 39, 38, 37, 38],
    accuracy: 71,
    autoTradeEnabled: false
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    price: 12450.00,
    change: 185.50,
    changePercent: 1.51,
    sentimentScore: 69,
    volume: "1.2M",
    marketCap: "₹3.9L Cr",
    headline: "Maruti unveils new hybrid lineup, eyes 40% market share",
    sector: "Automobile",
    country: "India",
    coordinates: [77.2090, 28.6139],
    historicalSentiment: [66, 67, 68, 69, 70, 68, 69],
    accuracy: 81,
    autoTradeEnabled: false
  }
];

export interface Alert {
  id: string;
  symbol: string;
  type: 'price' | 'sentiment' | 'volume' | 'news';
  message: string;
  timestamp: Date;
  severity: 'high' | 'medium' | 'low';
  read: boolean;
}

export const alertsData: Alert[] = [
  {
    id: '1',
    symbol: 'TATAMOTORS',
    type: 'sentiment',
    message: 'Sentiment score jumped to 85% - Strong bullish signals detected',
    timestamp: new Date(Date.now() - 5 * 60000),
    severity: 'high',
    read: false
  },
  {
    id: '2',
    symbol: 'ASIANPAINT',
    type: 'sentiment',
    message: 'Sentiment dropped below 40% - Bearish trend emerging',
    timestamp: new Date(Date.now() - 15 * 60000),
    severity: 'high',
    read: false
  },
  {
    id: '3',
    symbol: 'RELIANCE',
    type: 'news',
    message: 'Breaking: Major acquisition announcement expected',
    timestamp: new Date(Date.now() - 30 * 60000),
    severity: 'medium',
    read: true
  },
  {
    id: '4',
    symbol: 'HDFCBANK',
    type: 'volume',
    message: 'Unusual volume spike detected - 3x average',
    timestamp: new Date(Date.now() - 45 * 60000),
    severity: 'medium',
    read: true
  },
  {
    id: '5',
    symbol: 'INFY',
    type: 'price',
    message: 'Price crossed 50-day moving average',
    timestamp: new Date(Date.now() - 60 * 60000),
    severity: 'low',
    read: true
  }
];

export const marketOverview = {
  totalStocks: 12,
  bullishCount: 7,
  bearishCount: 3,
  neutralCount: 2,
  avgSentiment: 65,
  marketStatus: 'open',
  lastUpdated: new Date()
};
