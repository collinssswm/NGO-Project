# 🌱 HopeReach NGO — Web Application

A responsive, multi-page website for **HopeReach NGO**, built with plain HTML, CSS, and vanilla JavaScript — no build tools or frameworks required.

---

## 📋 Project Overview

HopeReach is a fictional Non-Governmental Organisation that empowers communities through education, healthcare, clean water, sustainable livelihoods, women empowerment, and environment programmes.

The site serves as the organisation's public-facing digital presence: communicating its mission, showcasing programmes, publishing impact statistics, accepting donations, and inviting volunteers.

---

## 🗂️ File Structure

```
NGO-Project/
├── index.html          ← Home page
├── about.html          ← About Us page
├── programs.html       ← Our Programs page
├── contact.html        ← Contact & Donate page
├── css/
│   ├── style.css           ← Base styles & homepage (Member 1)
│   ├── about-programs.css  ← About & Programs page styles (Member 2)
│   └── contact-donate.css  ← Contact & Donate page styles (Member 3)
├── js/
│   └── main.js         ← Interactivity & form logic (Member 3)
└── images/             ← (placeholder for future image assets)
```

---

## 👥 Team Work Division

| Member | Responsibility | Files |
|--------|---------------|-------|
| **Member 1** | Home page & base design system | `index.html`, `css/style.css` |
| **Member 2** | About Us & Programs pages | `about.html`, `programs.html`, `css/about-programs.css` |
| **Member 3** | Contact/Donate page & JavaScript | `contact.html`, `css/contact-donate.css`, `js/main.js` |

> Each member owns a clearly scoped set of files so work can progress in parallel with minimal merge conflicts.

---

## 🚀 Getting Started

No installation needed. Simply open any HTML file in a web browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally with Python (recommended for full functionality)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 📄 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Hero, impact stats, programme previews, testimonial, CTA |
| About Us | `about.html` | Mission/Vision, our story, timeline, team, core values |
| Programs | `programs.html` | Six detailed programme cards, impact numbers, partners |
| Contact & Donate | `contact.html` | Contact form, donation widget, volunteer section |

---

## ✨ Features

- **Fully responsive** — works on mobile, tablet, and desktop
- **Sticky navigation** with active-link highlighting and mobile hamburger menu
- **Animated counters** — impact statistics animate when they scroll into view
- **Contact form** — client-side validation with accessible error messages
- **Donation widget** — preset amounts, custom amount, one-time/monthly/annual frequency
- **Toast notifications** — feedback messages after form submissions
- **Smooth scroll** — in-page anchor links scroll smoothly past the fixed navbar
- **Accessible** — semantic HTML5, ARIA labels, keyboard-navigable forms

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Markup & page structure |
| CSS3 | Styling, CSS Variables, Grid & Flexbox, responsive breakpoints |
| Vanilla JavaScript (ES6+) | Navigation, counters, form validation, donation widget |

---

## 🤝 Contributing

1. **Assign yourself** to your section (see Work Division table above).
2. Create a feature branch: `git checkout -b feature/<your-name>/<feature>`.
3. Make your changes, commit with a clear message, and open a Pull Request.
4. Request a review from at least one team member before merging.

---

*Made with ❤️ for communities in need.*
