export const GET = () => {
	return new Response(
		`User-agent: *
Allow: /
Disallow: /secret-page/
Crawl-delay: 0

Sitemap: https://ingesoftnet.com/sitemap-index.xml
`,
		{
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
		}
	);
};
