import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, content-type',
};

const EXPIRY_TIME = 60 * 10; // 10 minutes

serve(async (req) => {
	try {
		const redis = new Redis({
			url: Deno.env.get('UPSTASH_URL')!,
			token: Deno.env.get('UPSTASH_AUTH_TOKEN'),
		});

		/** The original Coingecko endpoint */
		const url = req.url.split('/price/api/v3/')[1];

		if (!url) {
			// throw
			throw new Error('Invalid token price API url');
		}

		/** The coingecko token ID */
		let tokenId;

		if (url.startsWith('coins/wilder-world')) {
			tokenId = 'wilder-world';
		} else if (url.startsWith('coins/ethereum')) {
			tokenId = 'ethereum';
		} else {
			throw new Error(
				'Invalid token - this API may only retrieve ETH or WILD prices',
			);
		}

		/*
		 * Try get the cached response from Redis first
		 */

		const cachedResponse = await redis.get(tokenId);

		if (cachedResponse) {
			return new Response(JSON.stringify(cachedResponse), {
				headers: { 'Content-Type': 'application/json', ...corsHeaders },
			});
		}

		/*
		 * There was no cached response, so lets query the Coingecko API
		 */

		let data;

		try {
			const res = await fetch('https://api.coingecko.com/api/v3/' + url);
			data = await res.json();
		} catch (e) {
			throw new Error('Failed to retrieve token price from API');
		}

		/*
		 * Cache the response in Redis, and return it
		 */

		try {
			await redis.set(tokenId, JSON.stringify(data), { ex: EXPIRY_TIME });
		} catch (e) {
			console.warn(`Failed to stash value for ${tokenId} in Redis: `, e);
		}

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json', ...corsHeaders },
		});
	} catch (e) {
		console.error(e);

		return new Response(JSON.stringify({ error: e.message }), {
			headers: { 'Content-Type': 'application/json', ...corsHeaders },
			status: 500,
		});
	}
});
