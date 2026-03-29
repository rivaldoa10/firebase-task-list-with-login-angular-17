import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"task-list-login",
      "appId":"1:127233459285:web:f215549189c9d5680cc0dc",
      "storageBucket":"task-list-login.firebasestorage.app",
      "apiKey":"AIzaSyD-m9ksUZiFWXzrXA7u3-6VTyL17lrIIdU",
      "authDomain":"task-list-login.firebaseapp.com",
      "messagingSenderId":"127233459285"
    
  })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

