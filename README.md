# Urban Deca Homes Properties (Next.js SEO-First Web Application)

A complete, high-performance, responsive multi-page real estate application built for **Urban Deca Homes Philippines** (developments by 8990 Holdings, Inc.). Engineered with Next.js 14 App Router, TypeScript, Tailwind CSS, comprehensive Schema.org structured data, and local SEO architecture tailored for the Philippine property market.

---

## 1. Quick Start & Local Development

### Prerequisites
- **Node.js**: v18.17.0+ (Tested on Node v24.21.0)
- **Package Manager**: npm v10+

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
# Compile and validate production build
npm run build

# Start production server
npm run start
```

---

## 2. Information Architecture & Route Sitemap

The application recreates and enhances all 10 core routes from the reference architecture:

| Route | Page Name | Primary Search Intent | Schema.org Structured Data |
| :--- | :--- | :--- | :--- |
| **`/`** | Homepage | Brand Discovery (`Urban Deca Homes Philippines`) | `WebSite`, `RealEstateAgent`, `Organization`, `FAQPage` |
| **`/manila`** | Urban Deca Homes Manila | Specific Development (`Condo in Tondo Manila`, `Pag-IBIG condo Manila`) | `ApartmentComplex`, `BreadcrumbList` |
| **`/ortigas`** | Urban Deca Homes Ortigas | Specific Development & Location (`Condo in Pasig City`, `Ortigas Ave Ext`) | `ApartmentComplex`, `BreadcrumbList` |
| **`/cubao`** | Urban Deca Towers Cubao | Transit Micro-Condo (`Condo in Cubao Quezon City`, `EDSA Studio Condo`) | `ApartmentComplex`, `BreadcrumbList` |
| **`/details`** | Financing & Buyer Guide | Financing Research (`Pag-IBIG condo financing`, `condo buying process`) | `BreadcrumbList`, `HowTo` |
| **`/inquire-now`** | Inquire & Full FAQ Hub | Buyer Conversion (`schedule condo viewing`, `computation sheet`) | `FAQPage`, `BreadcrumbList` |
| **`/contact-us`** | Contact & Sales Desks | Brand Contact Intent (`Urban Deca Homes contact number`, `office hours`) | `LocalBusiness`, `BreadcrumbList` |
| **`/news-and-promo`** | News & Promos Index | Promotional Research (`Urban Deca Homes promo`, `low cash out`) | `CollectionPage`, `BreadcrumbList` |
| **`/news-and-promo/[slug]`** | Dynamic Article Detail | Content & Update Authority (`4PH housing program`, `Lagoon Park updates`) | `NewsArticle`, `BreadcrumbList` |
| **`/jobs`** | Careers & Recruitment | Recruitment (`Urban Deca Homes careers`, `real estate sales executive`) | `JobPosting`, `BreadcrumbList` |
| **`/4ph`** | 4PH Housing Program | Government Housing Subsidy (`Pambansang Pabahay para sa Pilipino`) | `GovernmentPermit / Article`, `BreadcrumbList` |

---

## 3. SEO & Technical Implementation Highlights

### A. Technical SEO Foundations
- **Server Components by Default**: Headings, unit specifications, prices, location landmarks, and FAQs are server-rendered into raw HTML for instant search engine indexing.
- **Configurable Canonical URL**: Built via `lib/seo.ts` using `process.env.NEXT_PUBLIC_SITE_URL` to prevent duplicate content across environments.
- **Dynamic Sitemap**: Automatically generated at `/sitemap.xml` via `app/sitemap.ts`, capturing all 10 core routes plus dynamic news articles.
- **Robots Directive**: Generated at `/robots.txt` via `app/robots.ts`, cleanly allowing public routes while guarding internal endpoints.
- **Typography & Font Optimization**: Fonts (*Adamina* for serif headings, *Poppins* for sans-serif body) are self-hosted using `next/font/google`, eliminating third-party blocking network requests and guaranteeing zero Cumulative Layout Shift (CLS).

### B. Conversion Rate Optimization (CRO) Features
1. **Interactive Monthly Amortization Calculator** (`components/FinancingCalculator.tsx`):
   - Computes principal & interest, insurance reserves, and Pag-IBIG 35% income benchmarks in real-time.
2. **Side-by-Side Unit Comparison Table** (`components/UnitComparison.tsx`):
   - Compares floor cuts, pricing, and monthly amortizations across all 3 developments.
3. **Smart Dependent Inquiry Form** (`components/InquiryForm.tsx`):
   - Dynamically filters unit choices based on selected development with privacy consent and anti-spam protection.
4. **On-Site Viewing Appointment Scheduler** (`components/ViewingScheduler.tsx`):
   - Empowers buyers to book free guided tours with accredited specialists.
5. **Floating Action Bar** (`components/FloatingQuickContact.tsx`):
   - Mobile-first quick-dial and WhatsApp chat triggers.

---

## 4. Environment Variables

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=https://urbandecahomes.properties
```

---

## 5. Ongoing Maintenance & Content Management

All structured content is separated into clean, modular TypeScript datasets in `data/`:
- `data/projects.ts`: Update pricing, unit availability status, deliverables, and gallery images.
- `data/business.ts`: Manage hotlines, office addresses, and viewing hours.
- `data/financing.ts`: Update Pag-IBIG and commercial bank interest rate assumptions.
- `data/faqs.ts`: Add new buyer questions and answers.
- `data/news.ts`: Publish new articles, promotional campaigns, and press releases.
- `data/jobs.ts`: Update sales agent and leadership career openings.
