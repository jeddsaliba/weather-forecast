// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://api.openweathermap.org',
  secureUrl: 'https://api.openweathermap.org',
  appName: 'Weather Forecast',
  auth: {
    domain: 'dev-e8t4tu34kbulhsi7.us.auth0.com',
    clientId: 'lPsrNekzfshAocDX0pke2dAzxFJBpx7A'
  },
  weather: {
    key: '106bf8b6c1f846e220f9b342333a8bbd',
    units: `imperial`
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
