import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/usersManagment/app.config';
import { AppComponent } from './app/usersManagment/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
