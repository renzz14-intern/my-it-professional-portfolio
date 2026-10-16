# Lawrence Fortin — BSIT Industry-Ready Portfolio

A static, responsive portfolio website built with **HTML5, CSS3, vanilla JavaScript, and Bootstrap Icons**. It follows the *BSIT Industry-Ready Portfolio: Student Guidelines* and works on GitHub Pages with no backend. The visual system uses a subtle grid, blue and ink tones, warm evidence markers, scroll reveals, and reduced-motion support.

> **Rule of this portfolio: NO EVIDENCE = NO SKILL CLAIM.**
> Anything not yet supplied shows a yellow, clearly marked **[placeholder]**. Nothing was invented: no projects, certificates, repositories, test results, or interview records.

---

## 1. Project structure

```
portfolio/
├── index.html                 ← all 19 sections plus Home, in the required order
├── css/style.css              ← responsive visual system, animation, reduced-motion rules
├── js/
│   ├── data.js                ← ★ the file you edit most (skills, cases, AI log, links…)
│   └── script.js              ← rendering + interactions (rarely needs editing)
└── README.md                  ← this file
```

Asset directories and a resume PDF are intentionally not included. Add only real photos, project evidence, certificates, and documents. The page keeps visible placeholders and disables unavailable downloads or links until you provide them.

Section order (also used by the navigation): **Home → About Me → Technical Skills → Projects → Database Project → Data Analysis → Cybersecurity → Web Development → Project Documentation / Step 16 → Cloud / Deployment → AI Project or AI Literacy Evidence → Troubleshooting → Resume → Certificates / Achievements → GitHub → LinkedIn → Interview / Employability Evidence → Career Plan → Reflection → Contact Information.**
Education is inside *About Me*.

## 2. Open and test in Visual Studio Code

1. Install the **Live Server** extension (Ritwick Dey) in VS Code.
2. *File → Open Folder…* and choose the `portfolio` folder.
3. Right-click `index.html` → **Open with Live Server**. The site opens at `http://127.0.0.1:5500` and reloads when you save.
4. (Alternative) In a terminal: `python -m http.server 8000`, then visit `http://localhost:8000`.

An internet connection is needed for Bootstrap Icons and Google Fonts (DM Sans, Space Grotesk, and DM Mono, loaded from CDNs). The site itself does not require Bootstrap CSS or a backend.

## 3. Replace personal information and placeholders

| What | Where |
|---|---|
| Email, GitHub URL, LinkedIn URL, contact-form service | `js/data.js` → `config` |
| School, specialization, academic year, target position | `index.html` → About Me → “Profile information” |
| Personal introduction, career objective, interests | `index.html` → About Me |
| Education timeline | `js/data.js` → `education` |
| Profile photo | Put your photo in `assets/images/profile/` and change the `src` in the hero `<img>` (use a square image, ≤ 200 KB) |
| Any yellow `[placeholder]` text in a section | Edit it directly in `index.html` (search for the bracketed text) |

Links you leave empty (`''`) automatically show as disabled buttons with a tooltip. No broken or fake links are created.

## 4. Add screenshots, documents, certificates, and the resume

- **Screenshots, ERD, charts:** create `assets/images/projects/`, save compressed images there, then replace the matching evidence placeholder in `index.html` with an `<img>` and descriptive `alt` text.
- **Project cards:** `js/data.js` → `projects` → set `description`, `tech`, `status`, `thumb`, `github`, `live`.
- **Project 1 README (16 fields):** `index.html` → Web Development → `<details id="project-readme">`. Replace each placeholder paragraph.
- **Resume:** add your real, reviewed one-page resume at `assets/documents/resume.pdf`; the view/download controls remain disabled until then.
- **Certificates:** create `assets/images/certificates/` for certificate images, then edit `js/data.js` → `certificates` (title, issuer, date, description, image, verify link). Add or remove entries freely.
- **Other downloads** (Excel files, SQL dumps, documentation PDFs): create `assets/documents/` and link files from the matching section.

## 5. Update skills, troubleshooting cases, and the AI usage log

All of these live in **`js/data.js`**.

- **Skills Inventory (Area / Skill / Level / Evidence):** edit `skills`. Leave `level: ''` until you have evidence. Then use `'Beginner'`, `'Intermediate'`, or `'Advanced'`, and fill `evidence` plus `evidenceHref` (e.g., `'#web-development'` or a GitHub URL).
- **Troubleshooting cases (Case Number / Problem / Possible Causes / Diagnostic Procedure / Solution / Lesson Learned):** edit `troubleshooting`. Change `status` to `'real'` (you solved it) or `'simulated'` (practice scenario). The guidelines require **at least five** cases; the page shows how many are documented.
- **AI Usage Log (Date / Task / AI Assistance / My Verification / Result):** edit `aiLog`. Only log things that really happened. The first row (this site was generated with AI assistance) is true. **You must write your own verification** in that row.
- **Repositories, mock-interview questions, defense outline:** `repos`, `mockInterview`, `projectDefense`.

### Optional “edit mode” (drafting in the browser)
Open the site with `?edit=1` (e.g., `http://127.0.0.1:5500/index.html?edit=1`). The AI log, career plan, reflection, interview answers, and similar boxes become editable. Edits are saved **only in your browser**. Use **Export JSON** to copy them out, then paste the final text into `index.html` / `data.js` so visitors see it.
The reflection box shows a live word count (target **500–800 words**).

## 6. Contact form

The form validates all fields and the email format, and is honest about what it does:
- **No config:** it shows “Message NOT sent” (nothing pretends to be delivered).
- **`config.email` set:** it opens the visitor's email app (`mailto:`), with the message filled in.
- **`config.formEndpoint` set** (e.g., a Formspree form URL): it sends the message through that service and reports success or failure.

## 7. Publish on GitHub Pages

1. Create a GitHub repository (e.g., `portfolio`) and upload the **contents** of this folder so `index.html` is at the repository root.
   ```bash
   git init
   git add .
   git commit -m "Add BSIT portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
3. After about a minute the site is at `https://<your-username>.github.io/portfolio/`.
4. Open it on your phone, test every link, then add the URL to your LinkedIn, resume, and GitHub profile.

Notes: all paths in this project are **relative**, so they work under a project URL. File names are **case-sensitive** on GitHub Pages. GitHub Pages hosts static files only. A PHP/MySQL project (Project 1) needs a separate backend host, and the Cloud / Deployment section should say so honestly. **Never commit passwords, tokens, or API keys.**

## 8. Testing checklist

**Structure**
- [ ] All 19 sections plus Home are present, in the required order; Education is inside About Me.
- [ ] The five templates are present: Skills Inventory, Project 1 README (16 fields), Troubleshooting cases (5), AI Usage Log, Career Plan (9 fields).

**Desktop (≥ 1200 px) and laptop (~1024 px)**
- [ ] Top nav shows About Me, Technical Skills, Projects, Troubleshooting, Contact Information, **All Sections** menu, and “Let's Talk”.
- [ ] “All Sections” lists all 20 entries in order; each link scrolls to the right section.
- [ ] The nav highlights the section you are reading.
- [ ] The subtle grid and section color changes remain legible; no horizontal scrollbar.

**Tablet (~768 px) and mobile (~375 px)**
- [ ] The hamburger menu opens, links work, and the menu closes after choosing one.
- [ ] Hero stacks (photo first, then text); the education timeline becomes a single column.
- [ ] Skills table and AI log turn into stacked rows; nothing is cut off.
- [ ] No horizontal scrolling anywhere (test also in landscape).

**Functionality**
- [ ] Explore my work and Let's Talk navigate to their sections; resume controls stay disabled until a real PDF is added.
- [ ] Project repository/demo links activate when configured; “Project README” opens the Project 1 documentation.
- [ ] Troubleshooting cases expand and collapse; certificate entries show issuer, date, description, and an optional verification link.
- [ ] Contact form: empty submit shows errors; a bad email is rejected; the result message is truthful.
- [ ] Back-to-top button appears after scrolling and works.
- [ ] Keyboard only: Tab reaches every control with a visible focus ring; the “Skip to main content” link works.

**Content integrity**
- [ ] No claim is made without evidence; every yellow placeholder is either filled or deliberately left.
- [ ] No passwords, tokens, or API keys anywhere in the repository.

## 9. Credits and licensing

- Visual direction: editorial portfolio layout, structured grid, simple timeline, and restrained motion. The page uses original code and text.
- [Bootstrap Icons](https://icons.getbootstrap.com/) (MIT). Fonts: DM Sans, Space Grotesk, and DM Mono via Google Fonts (SIL OFL).