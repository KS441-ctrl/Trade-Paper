#!/bin/bash
# Build backend
cd paper_trading_backend && npm install && npm run build

# Return to the project root
cd ..

# Build frontend
cd Paper_Trading_frontend && npm install && npm run build
