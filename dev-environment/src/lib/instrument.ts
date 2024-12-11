import * as Sentry from '@sentry/react';

// @ts-ignore
const { VITE_SENTRY_DSN } = import.meta.env;

Sentry.init({
	dsn: VITE_SENTRY_DSN,
	integrations: [
		Sentry.reactRouterV5BrowserTracingIntegration({ history }),
		Sentry.replayIntegration(),
	],
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
