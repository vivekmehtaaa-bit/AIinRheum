# AI × Rheumatology — 12-Month Thought Leadership Pathway

A personal progress tracker for becoming a thought leader in AI-enabled rheumatology.

## Features

- **4-phase pathway** with checkable tasks, deadlines, and publication opportunities
- **13-publication pipeline** with status tracking (Idea → Published)
- **10 AI skills** sequenced across the year
- **Countdown timers** for critical deadlines (EB-1A RFE, ACR abstracts, Convergence)
- **Recurring rhythm reminders** (writing blocks, LinkedIn cadence, journal reviews)
- Progress saves in your browser (localStorage)

## Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
3. Select this repo
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy

Site auto-updates on every push to main.
