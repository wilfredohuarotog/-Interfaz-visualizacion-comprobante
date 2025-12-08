import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
    },
    {
        path: 'documents',
        loadComponent: () => import('./components/documents/layout/layout').then(m => m.Layout)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.Login)
    }
];
