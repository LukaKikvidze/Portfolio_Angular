# Luka Kikvidze – Angular Portfolio (Angular 20)

Modern, responsive portfolio built with Angular standalone components and plain CSS (no Tailwind/Bootstrap).

## Features
- Pages: Home, About, Projects (filter), Skills, Contact
- Shared: Navbar with dark/light mode (persisted), Footer, Project Card, Lightbox modal
- SEO meta per page, accessible markup, keyboard-friendly
- Sample data for 7 projects with thumbnails
- Downloadable CV PDF (assets/pdf/luka-kikvidze-cv.pdf)

## Run locally
```bash
npm install
ng serve
```
Open http://localhost:4200

## Build
```bash
ng build
```

## Project structure
- src/app/pages/* – page components (.ts/.html/.css)
- src/app/shared/* – navbar/footer
- src/app/components/* – project-card, lightbox
- src/app/services/* – theme, seo, projects
- src/assets/images – project thumbnails
- src/assets/pdf – CV

## Email sending (Contact form)
Choose one of:

1) EmailJS (no backend)
- Create account at https://www.emailjs.com
- Create service + template (fields: name, email, message)
- Add script tag in index.html or install package
- In contact.component.ts, replace the simulated delay with:
```ts
import emailjs from '@emailjs/browser';
await emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',{
  from_name: this.model.name,
  reply_to: this.model.email,
  message: this.model.message,
});
```
- Store keys in environment and never commit secrets

2) Minimal backend API
Example Node/Express endpoint:
```js
import express from 'express';
import nodemailer from 'nodemailer';
const app = express(); app.use(express.json());
app.post('/api/send-email', async (req,res)=>{
  const { name,email,message } = req.body;
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: 587, secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await t.sendMail({ from: email, to: 'you@example.com', subject: `Portfolio message from ${name}`, text: message });
  res.json({ ok: true });
});
app.listen(3000);
```
Then call it from contact.component.ts using fetch/HttpClient.

## Replace project links
- Edit src/app/services/projects.service.ts
- Update githubUrl/liveUrl and images in assets/images

## SEO
Each page sets title/description through SeoService. Update as needed.

## Deploy
- Netlify: drag-and-drop dist/ or connect repo. Build command: `ng build` Publish directory: `dist/fusion-angular-tailwind-starter/browser`
- Vercel: framework = Angular, build `ng build`, output same as above
- GitHub Pages: build, then deploy the `browser` folder to `gh-pages` branch. Ensure `<base href="/">` and repository settings point to Pages

## Notes
- Angular 20 (17+ requirement satisfied)
- Plain CSS only; Tailwind directives removed from src/styles.css
- Dark mode persisted via localStorage
