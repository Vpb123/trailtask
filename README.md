# TrialTask – Solana Frontend

A TypeScript + Next.js frontend demonstrating Solana wallet integration, real-time token feed, and SOL transfers. Built as part of a frontend task.

## Features Implemented

### Cosmo Page – Live Token Feed
- Connects to the Golang backend via WebSocket (`ws://127.0.0.1:8080/connect`).
- Displays real-time Solana token creation with metadata:
  - Mint address  
  - Name  
  - Symbol  

### Transfer Page – Send SOL
- Phantom Wallet connection and signing using `solana/web3.js`.  
- Input fields:
  - Amount (in SOL)  
  - Recipient Wallet Address  
- Estimated USD value via CoinGecko API.  
- Wallet address validation.  
- Builds, signs, and sends transactions to Solana Devnet RPC.  
- Shows toast notifications on successful transfers.

## Technologies Used
- **Frontend**: Next.js, React, TypeScript  
- **Blockchain Integration**: solana/web3.js, Phantom Wallet  
- **Real-time Data**: WebSockets  
- **API**: CoinGecko (SOL/USD price)  
- **Styling & UI**: TailwindCSS, Sonner (toast notifications)  

## Setup & Installation
1. Clone the repository:

```bash
git clone https://github.com/Vpb123/trialtask.git
cd trialtask
npm install
npm run dev
```
Run the Golang backend.

Open http://localhost:3000 in your browser.


All transactions run on Solana Devnet for testing.
git clone https://github.com/Vpb123/trialtask.git
cd trialtask
