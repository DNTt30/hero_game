Hero Game – IOTA Move Smart Contract + Frontend

This project includes a Move smart contract deployed on the IOTA Testnet and a frontend DApp that interacts with the contract.
Users can connect their wallet and mint new heroes on-chain.

📁 Project Structure
hero_game_project/
│
├── contract/             # Move smart contract source code
│   ├── Move.toml
│   ├── Move.lock
│   ├── sources/
│   │   ├── hero.move     # main module
│   │   └── contract.move
│   └── tests/
│       └── contract_tests.move
│
├── frontend/             # Next.js + IOTA dApp Kit UI
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
└── contract-address.txt  # Deployed package ID on testnet

🚀 Features

Deploy Move smart contract on IOTA Testnet

Mint new heroes (name + image URL)

Display transaction digest

Wallet connection with IOTA dApp Kit

Clean project architecture with separate backend & frontend

🧪 Smart Contract Deployment (Testnet)

The contract has been deployed to the IOTA Testnet.

📌 Contract Address (Package ID)
YOUR_PACKAGE_ID_HERE


(Replace with your actual testnet package ID)

You must update the frontend file:

frontend/app/page.tsx


By changing:

const PACKAGE_ID = "YOUR_PACKAGE_ID_HERE";
