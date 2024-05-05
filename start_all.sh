#!/bin/bash
# Start backend
cd paper_trading_backend
npm run start:prod

# Return to the root directory
cd ..

# Start frontend
cd Paper_Trading_frontend
npm run serve:ssr:Stock_Simulator
