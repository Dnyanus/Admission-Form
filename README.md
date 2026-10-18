# B.Com Admissions

A small static admission site with separate first-year and second-year forms. The forms save submissions to Supabase when configured. GitHub Pages serves the website; Supabase stores the application records.

## Connect the database

1. Create a Supabase project.
2. In its **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql).
3. In Supabase **Project Settings → API**, copy the project URL and the public anon/publishable key.
4. Replace the two placeholders in [`supabase-config.js`](supabase-config.js), then commit the change to `main`.
5. Submit a test application and confirm it appears in the `admission_applications` table.

The browser key is public by design. The SQL enables row-level security, grants the public role insert access only, and does not allow public reads. Never put a Supabase service-role key in this site or repository. Review the privacy notice, retention period, college process, and spam protection before collecting real applicants' personal data.

## Pages

- [First-year application](index.html)
- [B.Com second-year admission](bcom-2nd-year-admission.html)

Pushing changes to `main` triggers the GitHub Pages deployment workflow.

