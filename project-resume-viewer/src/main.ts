import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { RepoStore } from './app/core/stores/repo.store';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [RepoStore],
      useFactory: (repoStore: RepoStore) => () => repoStore.prefetch()
    }
  ]
}).catch((err) => console.error(err));
