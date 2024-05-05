import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { TradingServiceService } from './trading-service.service';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
            {
                path : '',
                redirectTo:'dashboard',
                pathMatch:'full'
            },
            {
                path:'login',
                component:LoginComponent

            },
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'register',
                component:RegisterComponent
            },
            {
                path:'holdings',
                component:HoldingsComponent
            }, 
            {
                path:'watchlist',
                component:WatchlistComponent
            },
            {
                path:'account',
                component:AccountComponent
            }

];
