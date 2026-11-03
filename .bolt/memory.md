# Project memory

## Product intent & audience

- Personal multi-page portfolio for Mairaj Abbas, a BBA Marketing student at IBA Karachi.
- Serves recruiters, hiring managers, professors, and collaborators, especially for marketing internship opportunities.
- Home page presents Mairaj’s profile, selected work, reach, and contact CTA in a polished scroll experience.
- Existing content, project data, uploaded assets, routes, and concise presentation are authoritative; do not invent facts, metrics, or outcomes.

## Brand personality & voice

- Professional, modern, thoughtful, ambitious, and impact-oriented.
- Copy is concise and recruiter-friendly, emphasizing marketing insight, creativity, initiative, leadership, and community impact.
- Visual polish should reinforce credibility and readability rather than distract from the work.

## Visual design & UX direction

- Premium dark portfolio aesthetic using the established palette, typography, layout, and component system.
- Hero uses generous clearance for the floating navbar, with text and portrait aligned on desktop; on narrow screens the portrait sits above centered text.
- Portrait remains slightly reduced so the image circle, orange ring, and accent circles are visible. Use cover positioning, face-focused vertical placement, subtle brightness/contrast enhancement, and a soft orange-to-peach glow.
- Home stats use one centered, wide dark card below the hero, with a large orange count, label, restrained glow border, and balanced spacing.
- Home sequence includes the six-keyword marquee, Selected Work featuring TheStudentLens, Skardu Minds, and Next Voyage, followed by the internship CTA band.
- Hero subtitle rotates among Marketing Student, Brand Thinker, Community Builder, and Content Creator at roughly 2.5-second intervals.
- Layout is tuned for a balanced 375px viewport without navbar overlap or excessive empty space.
- Motion is atmospheric and restrained: hero atmosphere, heading/section reveals, marquee, magnetic controls, card effects, cursor treatment, progress affordances, and route transitions.
- Motion now uses CSS and React behavior rather than a runtime Framer Motion dependency. Preserve transform/opacity-based effects, touch-device safeguards, and reduced-motion support.
- Preserve semantic structure, keyboard access, readable contrast, responsive behavior, and existing image alt text.

## Decisions, constraints & rationale

- Deployment failed because Vite/Rollup could not resolve the `framer-motion` import from `src/App.tsx`.
- Removed the runtime Framer Motion import and dependency, replacing the affected preloader, route wipe, hero word reveal, and blob drift behavior with CSS/React equivalents.
- This avoids reliance on a missing or stale deployment package while preserving the intended visual motion.
- Deployment-style checks now pass: linting, type checking, and production build.
- Existing routes remain Home (`/`), About (`/about`), Portfolio (`/portfolio`), Contact (`/contact`), and custom 404.
- Existing assets remain authoritative, including `/profile.jpg`, `/Mairaj-Abbas-Resume.pdf`, and portfolio images.
- Keep shared motion utilities centralized; scope Home-specific layout changes to the Home implementation.
- Do not externalize unresolved packages in Vite configuration as a workaround.
- Dependency audit advisories, if still present, are separate from the resolved build failure and should be reviewed independently.

## Open questions & assumptions

- Retry deployment after the dependency/import cleanup; confirm the deployed bundle matches the successful local production build.
- Confirm on real devices that the portrait and decorative circles remain visible beneath the navbar around 375px and tablet widths.
- Recheck hero balance, stat spacing, and page rhythm at 360px, 768px, and 1440px.
- Verify CSS/React motion timing, marquee behavior, hover/focus states, reduced-motion mode, and touch safeguards.
- Review Lighthouse and runtime performance for image loading, long-page animation cost, and route transitions.
- Confirm the final Home hierarchy feels polished without excessive motion or empty space.
- Review outstanding dependency audit advisories without expanding the established stack unnecessarily.