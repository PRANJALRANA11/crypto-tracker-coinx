## Cryptocurrency Price Tracker API 

### A Node.js/TypeScript application that tracks cryptocurrency prices, market caps, and provides statistical analysis using data from CoinGecko.

## Features

Real-time cryptocurrency price tracking
Automated price updates every 2 hours
Statistical analysis including standard deviation calculations
RESTful API endpoints
TypeScript support
MongoDB integration
OpenAPI/Swagger documentation
CORS enabled
Environment-based configuration

## Prerequisites

Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm or yarn
TypeScript

## Installation

#### Clone the repository:

``` 
clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

### Install dependencies:

```
npm install
```

### Create environment file:

```
cp .env.example .env
```

Update the .env file with your configuration:

```
PORT=
MONGODB_URI=
COINGECKO_API_URL=
COINGECKO_API_KEY=
```

### Development
## Start the development server:
```
npm run dev
```
### Build the project:
```
npm run build
```
```Start the production server:```
```
npm start
```
## API Endpoints
### Get Cryptocurrency Statistics
```
GET /api/v1/stats?coin=bitcoin
Query Parameters:
coin (required) - One of: bitcoin, matic-network, ethereum

Response:
jsonCopy{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### Get Price Standard Deviation
```
GET /api/v1/deviation?coin=bitcoin
Query Parameters:

coin (required) - One of: bitcoin, matic-network, ethereum

Response:
jsonCopy{
  "deviation": 4082.48
}
```
## API Documentation
### The API documentation is available through Swagger UI at ```http://localhost:3000/api/v1/api-docs``` when running the server. 
```Note``` Choose the server first in the swagger docs

## Database Schema
```
CryptoPrice
typescriptCopy{
  coinId: string;        // Cryptocurrency identifier
  priceUSD: number;      // Current price in USD
  marketCapUSD: number;  // Market cap in USD
  change24h: number;     // 24-hour price change percentage
  timestamp: Date;       // Time of record
}
```

## Background Jobs
### The application runs a background job every 2 hours to fetch the latest cryptocurrency data from CoinGecko. 

## Deployments
### monodb atlas and vercel

## License
### This project is licensed under the MIT License - see the LICENSE file for details.


