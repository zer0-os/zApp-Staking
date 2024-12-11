import * as Sentry from '@sentry/react';

// @ts-ignore
const { VITE_SENTRY_DSN } = import.meta.env;

Sentry.init({
	dsn: VITE_SENTRY_DSN,
	integrations: [
		Sentry.reactRouterV5BrowserTracingIntegration({ history }),
		Sentry.replayIntegration(),
	],
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
