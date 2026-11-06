# Launch Checklist: diamondhomeservice.com

The code is already set to the production domain `https://diamondhomeservice.com` (apex). Metadata base, canonical URLs, og:url, JSON-LD, `sitemap.xml` and `robots.txt` all use it. The steps below happen outside the repo.

## Cutover steps

1. **Add the domains in Vercel.**
   Vercel > Project > Settings > Domains > add `diamondhomeservice.com` and `www.diamondhomeservice.com`.
   Set `diamondhomeservice.com` as the primary domain and let `www` redirect to it, so it matches the canonical URLs in the code.

2. **Update DNS in the Squarespace domain panel.**
   - `A` record: host `@` -> `76.76.21.21`
   - `CNAME` record: host `www` -> `cname.vercel-dns.com`
   - Remove only the old `A` record(s) for `@` and the old `www` record that point at the Squarespace site. Nothing else.

3. **DO NOT touch MX or any other mail-related records** (MX, SPF/TXT, DKIM, DMARC). `info@diamondhomeservice.com` must keep receiving lead emails.

4. **Wait for DNS propagation, then verify.**
   - Vercel shows the domains as valid, and Vercel has issued the SSL certificate (padlock on https).
   - `https://www.diamondhomeservice.com` redirects to `https://diamondhomeservice.com`.
   - Submit the estimate form on the live domain and confirm the lead email arrives at `info@diamondhomeservice.com`.
   - Open `/sitemap.xml` and `/robots.txt` and confirm both show `https://diamondhomeservice.com`.

5. **Submit the sitemap in Google Search Console.**
   Add the property for `https://diamondhomeservice.com` (a Domain property is best) and submit `https://diamondhomeservice.com/sitemap.xml`.

## Before or at launch

- Swap the photos marked `[CLIENT: swap photo]` in `content/media.ts` (`sectionPhotos`) once the client supplies slider, bay, glass block and shingle photos.
- Confirm business hours (`[CONFIRM HOURS]` in `content/site.ts`).
- Confirm `RESEND_API_KEY` and `LEAD_TO_EMAIL` are set in Vercel production environment variables, and that `leads@diamondhomeservice.com` is a verified sender in Resend. This matters when the lead form is tested on the live domain.
