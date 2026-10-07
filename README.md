# Praise Fakorede — personal site

Multi-page site built on the original one-page portfolio. Case studies and writing are written in Notion and appear on the site when their status is set to Published. The original portfolio still lives, unchanged, at `/portfolio`.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, four selected results, three case studies, latest three writing entries |
| `/about` | The two-track story, capabilities, education and credentials |
| `/experience` | The two-track timeline and every role, with a link to a case study where one exists |
| `/work`, `/work/[slug]` | Case studies from Notion, filterable by tag |
| `/writing`, `/writing/[slug]` | Writing from Notion, filterable by tag, with reading time |
| `/contact` | Contact form, email and LinkedIn |
| `/portfolio` | The original one-page portfolio, shareable on its own |
| `/feed.xml` | RSS feed of everything published |

## One-time setup

### 1. Create the Notion database

Create a full-page database in Notion (call it something like "Website") with these properties. Names must match, though capitalisation does not matter.

| Property | Type | Notes |
| --- | --- | --- |
| Title | Title | The default title column, any name works |
| Type | Select | Options: `Case study`, `Writing` |
| Status | Status or Select | Only `Published` appears on the site |
| Publish date | Date | Entries dated in the future stay hidden until that day |
| Subtitle | Text | Shown under the title |
| Summary | Text | One line, used in link previews and the RSS feed |
| Tags | Multi-select | Used for the tag filter |
| Featured | Checkbox | Puts a case study on the homepage |
| Slug | Text | Optional. Sets the web address. Leave empty to build it from the title |
| Role | Select | Optional. Links a case study to a role on /experience. Use the organisation name, for example `BCP Origins` or `Hugheston Energies` |
| Substack URL | URL | Optional. Adds an "Also published on Substack" link |

The page cover (Add cover, at the top of a Notion page) becomes the cover image. Without one, the site shows a title card in the site colours.

### 2. Connect Notion to the site

1. Go to notion.so/profile/integrations, create a new internal integration called "Website", and copy its secret. That is `NOTION_TOKEN`.
2. Open the database, click `•••` in the top right, choose Connections, and add the "Website" integration. Share only this database with it.
3. Copy the database ID from its URL: the 32-character string just before `?v=`. That is `NOTION_DATABASE_ID`.

### 3. Set environment variables in Vercel

Project → Settings → Environment Variables. See `.env.example` for the full list.

- `NOTION_TOKEN`, `NOTION_DATABASE_ID` from step 2.
- `RESEND_API_KEY` from resend.com (free tier is enough). `CONTACT_TO_EMAIL` is where messages arrive.
- `CONTACT_FROM_EMAIL` is optional. Until you verify a domain in Resend, leave it empty and Resend will only deliver to the email address on your Resend account, so sign up to Resend with the address you want messages sent to.
- `REVALIDATE_SECRET`, any long random string.
- `NEXT_PUBLIC_SITE_URL`, your live address, for example `https://praisefakorede.com`.

Redeploy after adding them.

## Publishing

1. Write the page in Notion and fill in the properties.
2. Set Status to `Published` and make sure Publish date is today or earlier.
3. The site checks Notion every ten minutes, so the page appears within ten minutes.

To publish instantly, open the database's automations (lightning icon, available on paid Notion plans), add a trigger "When Status is set to Published", and an action "Send webhook" to:

```
https://YOUR-SITE/api/revalidate?secret=YOUR_REVALIDATE_SECRET
```

You can also paste that address into a browser to refresh the site by hand after an edit.

To unpublish, set Status back to `Draft`. To change a published page, edit it in Notion and it updates on the next refresh.

Changing a title changes the web address unless Slug is set, so set a Slug before sharing a link to a piece widely.

### Supported Notion blocks

Paragraphs, headings, bulleted, numbered and to-do lists, quotes, callouts, code, tables, toggles, columns, images, dividers, bookmarks, embeds and video links. Child pages and inline databases are left out of the public page.

### Substack

Substack has no publishing API, so cross-posting is manual. Publish on the site first, paste the piece into Substack's editor, then add the Substack link to the Notion page's Substack URL property.

## Editing the fixed content

Roles, results, capabilities and credentials live in `lib/portfolio-data.ts`. The timeline positions every role from its `start` and `end` dates, so adding a role means adding one object to `roles` and choosing a free `row` within its track. The visible range is set at the top of `components/portfolio/dual-track-timeline.tsx`.

## How the code is organised

```
app/
  layout.tsx                 fonts, site-wide metadata
  (site)/                    every page that uses the main header and footer
    page.tsx                 home
    about/  experience/  contact/
    work/  work/[slug]/      case studies (and their link-preview images)
    writing/  writing/[slug]/
  portfolio/page.tsx         original one-page portfolio
  api/notion-image/...       serves Notion images with fresh links
  api/revalidate/route.ts    instant refresh endpoint
  feed.xml/  sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
components/
  portfolio/                 original portfolio components (reused across the site)
  site/                      navigation, footer, cards, tags, covers, Notion renderer, contact form
lib/
  content/index.ts           the content layer every page reads from
  content/notion.ts          the Notion source
  content/schema.ts          the shared entry schema
  portfolio-data.ts          roles, results, capabilities, credentials
```

Pages only read content through `lib/content/index.ts` (`getAllWork`, `getWorkBySlug`, `getAllPosts`, `getPostBySlug`, `getAllTags`). To move off Notion later, write a new source module with the same three functions as `lib/content/notion.ts` and change the import at the top of `index.ts`.

Notion pages that fail the schema (missing date, wrong type) are skipped rather than breaking the live site, and the Vercel logs name the page and the field to fix.

## Local development

```
pnpm install
cp .env.example .env.local   # then fill it in
pnpm dev
```
