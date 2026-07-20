export const privacyPolicy = {
  lastUpdated: "July 20, 2026",
  sections: [
    {
      title: "The Short Version",
      content:
        "This site collects minimal analytics, only if you accept the consent banner. I don't sell or share your data with advertisers, since there are none. Rejecting analytics doesn't break anything.",
    },
    {
      title: "What This Site Is",
      content:
        "A static personal portfolio. There's nothing to submit, so no personal data is collected through user input. Only the background analytics below apply.",
    },
    {
      title: "Data Collection & Third-Party Services",
      content:
        "Three services run on this site. Two only run if you accept analytics; one always runs, since bug reports shouldn't depend on tracking consent.",
      items: [
        {
          label: "PostHog (US)",
          value:
            "Product analytics. Captures page views, scroll depth, and device performance metrics (LCP, INP, CLS). No session recordings, no names, emails, or user IDs. Requests are proxied through this site's own domain. Only runs after you click Accept.",
        },
        {
          label: "Vercel Analytics (US)",
          value:
            "Cookieless page-view counting from the hosting provider. No identifiers, just a counter. Only runs after you click Accept.",
        },
        {
          label: "Sentry (EU)",
          value:
            "Error tracking. Crash reports and stack traces when the site breaks. No behavioral or analytics data. Runs regardless of consent.",
        },
        {
          label: "Vercel (US) hosting",
          value:
            "Standard server logs (IP address, user-agent, requested page). Always runs; this is how any web server operates.",
        },
      ],
      summary:
        "Click Reject and PostHog and Vercel Analytics never load or send data. Only Sentry and standard hosting logs remain. Cross-border transfers rely on Standard Contractual Clauses or the EU-US Data Privacy Framework where applicable.",
    },
    {
      title: "Cookies & Local Storage",
      content:
        "This site doesn't set cookies directly. It stores one value in your browser's localStorage: a key called 'consent' that remembers whether you accepted or rejected analytics. Nothing else is stored client-side by this site. Reset it anytime via the Reset Cookies button in the footer, or by clearing localStorage in your browser. The banner reappears after you do.",
    },
    {
      title: "Your Rights",
      items: [
        "Reject analytics entirely: click Reject, the site works the same",
        "Change your choice anytime: use the Reset Cookies button in the footer",
        "Clear stored data: clear localStorage in your browser settings",
      ],
      summary:
        "There are no accounts, so there's nothing else to access, export, or delete. The only thing ever stored is your consent choice.",
    },
    {
      title: "Data Security",
      content:
        "Static site, hosted on Vercel, HTTPS enforced. No user data is stored on a server I control. It lives in your browser's localStorage or with the analytics providers listed above. Each provider is responsible for securing its own infrastructure; see their documentation for details.",
    },
    {
      title: "Changes",
      content:
        "The Last Updated date at the top reflects any changes to this policy. No email notifications, since there's no email list to send them to.",
    },
    {
      title: "Contact",
      content: "Questions about this policy:",
      email: "kennethloto.dev@gmail.com",
    },
  ],
};
