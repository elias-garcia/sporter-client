import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as moment from 'moment';

if (environment.production) {
  enableProdMode();
}

moment.locale(navigator.language);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
