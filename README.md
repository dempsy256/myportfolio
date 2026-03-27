# My Portfolio

A modern, high-performance portfolio website built with React, Vite, and Supabase.

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Locally:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 🛠️ Deployment

### Netlify SPA Routing
The project includes a [**`_redirects`**](file:///c:/Users/すいしいもせからす/Desktop/myportfolio/myportfolio/public/_redirects) file located in the `public` folder. 

**What it does:**
- It contains the instruction `/* /index.html 200`.
- This tells Netlify to redirect all incoming URL requests to `index.html`.
- This is essential for **Single-Page Applications (SPAs)** like this one, as it allows React Router to handle all sub-routes (e.g., `/admin`) correctly even after a page refresh. Without it, you would see a "404 Page Not Found" error.

## 🧰 Technologies
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth & Database)
- **Icons:** Lucide React
- **Animations:** Framer Motion