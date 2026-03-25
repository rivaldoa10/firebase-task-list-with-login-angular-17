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
      "projectId": "your-project-id",
      "appId": "your-app-id",
      "storageBucket": "your-storage-bucket",
      "apiKey": "your-api-key",
      "authDomain": "your-api-key",
      "messagingSenderId": "your-messaging-sender-id"
    
  })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

