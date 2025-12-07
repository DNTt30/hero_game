Hero Game – IOTA Move Smart Contract + Frontend DApp

This project demonstrates a complete decentralized application (dApp) built on the IOTA Move ecosystem.
It includes:

A fully functional Move smart contract

A Next.js + IOTA dApp Kit frontend

Deployment on the IOTA Testnet

Ability to mint new heroes with on-chain metadata

The goal of this project is to showcase how smart contracts, UI, and wallet interaction work together in a simple blockchain game.

📌 1. Project Structure
hero_game_project/
│
├── contract/                   # Move smart contract
│   ├── Move.toml
│   ├── Move.lock
│   ├── sources/
│   │   ├── hero.move          # Main hero module
│   │   └── contract.move
│   └── tests/
│       └── contract_tests.move
│
├── frontend/                   # Next.js + IOTA dApp Kit frontend
│   ├── app/
│   │   ├── page.tsx           # Main UI page
│   │   ├── layout.tsx
│   │   ├── globals.css
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── README.md
│
└── contract-address.txt        # Stores deployed package ID (testnet)


📦 2. Smart Contract Overview

The Move contract defines the logic for minting “Heroes”.
Each hero contains:

name: string

image_url: string

Owner’s address

Unique on-chain object ID

The module handles:

Creating a hero object

Emitting events

Managing hero ownership

🚀 3. Deployment (IOTA Testnet)

The contract was deployed successfully to the IOTA testnet.

▶ Published Package ID
<INSERT_YOUR_PACKAGE_ID_HERE>


(You must paste your real package ID.)

▶ Update Frontend

Inside:

frontend/app/page.tsx


Change:

const PACKAGE_ID = "<INSERT_YOUR_PACKAGE_ID_HERE>";

🖥️ 4. Frontend (Next.js + IOTA dApp Kit)

The frontend provides:

✔ Wallet connection

Supports IOTA wallet via ConnectButton.

✔ Mint Hero UI

User can mint a new hero by clicking a button.

✔ Real transaction execution

The app signs and executes the transaction using:

useSignAndExecuteTransaction()

✔ Displays transaction digest

Users can copy/view it after minting.

🧠 5. Technologies Used
Smart Contract

Move Language

IOTA Move VM

IOTA CLI (iota client publish)

Frontend

Next.js 14

TypeScript

TailwindCSS

IOTA dApp Kit

Node.js 18+

🧪 6. How to Run the Project
Backend (Move Contract)
cd contract
iota move build
iota client publish --network testnet


After publishing, copy the package ID to:

contract-address.txt

frontend/app/page.tsx

Frontend
cd frontend
npm install
npm run dev


Open browser:

http://localhost:3000


Connect your wallet → Mint a hero → View transaction digest.

📄 7. Contract Address File

Located at root:

contract-address.txt


Contents:

Testnet Package ID:
<INSERT_YOUR_PACKAGE_ID_HERE>

🎮 8. Features Summary
✔ Testnet smart contract
✔ Mint hero (name + image URL)
✔ Display transaction digest
✔ Clean folder structure
✔ Full frontend + backend integration
✔ GitHub ready for submission
🏁 9. Conclusion

This project successfully demonstrates the full workflow of a Web3 game on IOTA:

Building a Move contract

Deploying on testnet

Connecting a wallet

Executing blockchain transactions

Integrating a modern frontend UI

It is ready for submission as a complete blockchain development assignment.
