# ProjectResumeViewer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Local dev proxy and production routing

To keep the backend hostname hidden in production, the app uses a same-origin API path (`/api/Github`). The production build expects the API to be reachable at `/api/Github` on the same origin. In Azure Static Web Apps you can arrange for your API to be served from that path (or use a front-door/proxy in front of your API). If you keep the backend as a separate App Service, ensure CORS allows the static site origin.

For local development you can proxy `/api` to the local backend using `proxy.conf.json`:

```powershell
ng serve --proxy-config proxy.conf.json
```

The provided `proxy.conf.json` routes `/api` to `http://localhost:5265` where the API runs when launched via `dotnet run` from the API project.
