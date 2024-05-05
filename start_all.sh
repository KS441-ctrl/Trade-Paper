#!/bin/bash
# Start backend
cd paper_trading_backend
nest start --watch

# Return to the root directory
cd ..

# Start frontend
cd Paper_Trading_frontend
ng serve
