import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig = {
  providers: [provideServerRendering()]
};

export const appServerConfig = mergeApplicationConfig(appConfig, serverConfig);
