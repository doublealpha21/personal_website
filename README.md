# Praise Fakorede — personal site

Multi-page site built on the original one-page portfolio. Case studies and writing are written in Notion and appear on the site when their status is set to Published. The original portfolio lives at `/portfolio` as a standalone deck for clients.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, four selected results, three case studies, latest three writing entries |
| `/about` | The two-track story, capabilities, education and credentials |
| `/experience` | The two-track timeline and every role, with a link to a case study where one exists |
| `/work`, `/work/[slug]` | Case studies from Notion, filterable by tag |
| `/writing`, `/writing/[slug]` | Writing from Notion, filterable by tag, with reading time |
| `/contact` | Cal.com booking link, email and LinkedIn |
| `/portfolio` | The original one-page portfolio. Not linked from the site and not indexed; send the link to clients directly |
| `/feed.xml` | RSS feed of everything published |

## One-time setup

### 1. Set up the two Notion databases

Writing and case studies live in separate databases:

- **Writing** is your existing blog database ("Thoughts and Exposé's"). Every page in it counts as writing, so it needs no Type column.
- **Case studies** is a new full-page database (call it something like "Case studies"). Add one page per project when it is ready to share.

Add these properties to each. Names must match, though capitalisation does not matter.

| Property | Type | Writing | Case studies | Notes |
| --- | --- | --- | --- | --- |
| Title | Title | ✓ | ✓ | The default title column, any name works |
| Status | Status or Select | ✓ | ✓ | Only `Published` appears on the site, so you choose post by post |
| Publish date | Date | optional | optional | Defaults to the page's created date. Future dates stay hidden until that day |
| Summary | Text | optional | ✓ | One line, used on cards, link previews and the RSS feed |
| Subtitle | Text | optional | optional | Shown under the title |
| Tags | Multi-select | optional | optional | Used for the tag filter |
| Featured | Checkbox | | optional | Puts a case study on the homepage |
| Role | Select | | optional | Links a case study to a role on /experience. Use the organisation name, for example `BCP Origins` or `Hugheston Energies` |
| Slug | Text | optional | optional | Sets the web address. Leave empty to build it from the title |
| Substack URL | URL | optional | | Adds an "Also published on Substack" link |

The page cover (Add cover, at the top of a Notion page) becomes the cover image. Without one, the site shows a title card in the site colours.

### 2. Connect Notion to the site

1. Go to notion.so/profile/integrations, create a new internal integration called "Website", and copy its secret. That is `NOTION_TOKEN`.
2. Open each database, click `•••` in the top right, choose Connections, and add the "Website" integration. Share only these two databases with it.
3. Copy each database's ID: the 32-character string just before `?v=` in its link. For a database inside another page, hover over it and use `•••` → Copy link to view. The writing one is `NOTION_WRITING_DATABASE_ID`, the case studies one is `NOTION_WORK_DATABASE_ID`.

(A single combined database still works: set `NOTION_DATABASE_ID` instead and add a `Type` select with `Case study` and `Writing`.)

### 3. Set environment variables in Vercel

Project → Settings → Environment Variables.

- `NOTION_TOKEN`, `NOTION_WRITING_DATABASE_ID` and `NOTION_WORK_DATABASE_ID` from step 2.
- `REVALIDATE_SECRET`, any long random string.
- `NEXT_PUBLIC_SITE_URL`, your live address, for example `https://princepraisefakorede.vercel.app`.

Redeploy after adding them.

## Publishing

1. Write the page in the writing or case studies database and fill in the properties.
2. Set Status to `Published`. If Publish date is set, make sure it is today or earlier.
3. The site checks Notion every ten minutes, so the page appears within ten minutes.

To publish instantly, open each database's automations (lightning icon, available on paid Notion plans), add a trigger "When Status is set to Published", and an action "Send webhook" to:

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

Roles, results, capabilities, credentials and contact details (email, LinkedIn, the Cal.com booking link) live in `lib/portfolio-data.ts`. The timeline positions every role from its `start` and `end` dates, so adding a role means adding one object to `roles` and choosing a free `row` within its track. The visible range is set at the top of `components/portfolio/dual-track-timeline.tsx`.

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
  site/                      navigation, footer, cards, tags, covers, Notion renderer
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
