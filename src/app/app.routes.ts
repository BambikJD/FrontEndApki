import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './usersManagment/user.component';

export const routes: Routes = [
    { path: 'users', component: UserComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: '**', redirectTo: '/users' }
];
