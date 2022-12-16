import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfiguration, AppConfig } from './configuration';
import { AppModule } from './app/modules/app.module';
import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
(async () => {
  try {
    const config: AppConfiguration = await fetch('assets/configuration.json').then(res => res.json());

    if (config.production) {
      enableProdMode();
    }

    platformBrowserDynamic([
      { provide: AppConfig, useValue: config }
    ]).bootstrapModule(AppModule)
      .catch(err => console.error(err));

  } catch (e) {
    console.error('Error initializing', e);
  }
})();