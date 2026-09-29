# DentalClinic_Website
Premium Dental Clinic Website
# Development and deployment

Run `npm ci`, then `npm run dev`. Validate with `npm run typecheck` and `npm run build`.
Vercel should use the Vite preset, build command `npm run build`, and output directory `dist`.

Source-download functionality has been removed from the website.

Online appointment requests require `VITE_API_BASE_URL` in the build environment.
The backend must accept `POST /appointments` and return a nonempty `reference` plus
`status: "pending_confirmation"`. Without a backend URL, visitors are directed to
call the clinic; requests are never silently saved in localStorage or falsely confirmed.
