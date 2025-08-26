import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Note: Firebase services are client-only and should not be provided on the server
  ]
};

export const appServerConfig = mergeApplicationConfig(appConfig, serverConfig);