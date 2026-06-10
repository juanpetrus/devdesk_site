<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevDesk site. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `instrumentation-client.ts` pattern for Next.js 15.3+. Enables autocapture, exception tracking, and routes events through the `/ingest` reverse proxy.
- **`next.config.ts`**: Added reverse proxy rewrites for `/ingest/*` and `/ingest/static/*` and `/ingest/array/*` so PostHog requests go through the same domain, avoiding ad blockers.
- **`lib/posthog-server.ts`** (new): Singleton PostHog server-side client using `posthog-node` for capturing events from API routes.
- **`app/components/WaCta.tsx`** (new): Client component wrapping WhatsApp anchor tags on the homepage, firing `whatsapp_cta_clicked` with a `section` property on each click.
- **`app/page.tsx`**: Replaced all 5 WhatsApp `<a>` tags (header, hero, services, final CTA, floating button) with the `WaCta` client component.
- **`app/(lp)/sua-empresa-com-um-site-profissional-7-dias/Lp.tsx`**: Added `posthog.identify()` + `posthog.capture("lead_submitted")` when user submits form; `posthog.capture("whatsapp_cta_clicked")` for anonymous WA clicks.
- **`app/(lp)/sua-loja-virtual-vendendo-em-10-dias/LpEcommerce.tsx`**: Same pattern as above for the e-commerce LP.
- **`app/obrigado/TrackLead.tsx`**: Added `posthog.capture("lead_converted")` on mount, alongside existing Meta Pixel and Google Ads conversion tracking.
- **`app/api/lead/route.ts`**: Added server-side `posthog.capture("lead_api_received")` after a lead is successfully relayed to the Google Sheets webhook.

## Events

| Event | Description | File |
|---|---|---|
| `lead_submitted` | User fills the contact form and clicks WhatsApp CTA on the site (7-day) LP | `app/(lp)/sua-empresa-com-um-site-profissional-7-dias/Lp.tsx` |
| `whatsapp_cta_clicked` | User clicks WhatsApp CTA on the site LP without filling the form | `app/(lp)/sua-empresa-com-um-site-profissional-7-dias/Lp.tsx` |
| `lead_submitted` | User fills the contact form and clicks WhatsApp CTA on the e-commerce LP | `app/(lp)/sua-loja-virtual-vendendo-em-10-dias/LpEcommerce.tsx` |
| `whatsapp_cta_clicked` | User clicks WhatsApp CTA on the e-commerce LP without filling the form | `app/(lp)/sua-loja-virtual-vendendo-em-10-dias/LpEcommerce.tsx` |
| `lead_converted` | User reaches the /obrigado thank-you page, confirming a full conversion | `app/obrigado/TrackLead.tsx` |
| `lead_api_received` | Server-side: lead successfully relayed to Google Sheets webhook | `app/api/lead/route.ts` |
| `whatsapp_cta_clicked` | User clicks a WhatsApp CTA on the main homepage (section: header, hero, services, cta_final, floating) | `app/components/WaCta.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/464538/dashboard/1695564)
- [Total leads submitted (wizard)](https://us.posthog.com/project/464538/insights/5DjKHZus)
- [Lead submissions over time (wizard)](https://us.posthog.com/project/464538/insights/UCXj5YFB)
- [WhatsApp CTA clicks over time (wizard)](https://us.posthog.com/project/464538/insights/8MaacvaV)
- [Leads by source (wizard)](https://us.posthog.com/project/464538/insights/N32T9Oxf)
- [Lead conversion funnel (wizard)](https://us.posthog.com/project/464538/insights/HSyBY0zN)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
