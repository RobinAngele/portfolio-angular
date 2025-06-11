import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent) 
  },
  { 
    path: 'legal-notice', 
    loadComponent: () => import('./pages/legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent) 
  },
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
