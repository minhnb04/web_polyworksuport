import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
  production: boolean;
  API: string;
}

export const AppConfig = new InjectionToken<AppConfiguration>(
  '@@appConfiguration'
);
