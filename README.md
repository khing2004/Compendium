#📚 Compendium

A lightweight, custom-built web application focused on structured content delivery, interactive logic handling, and modular architecture.

Compendium is a CMS-free system built with Laravel + Vanilla JavaScript, designed to demonstrate the ability to build, debug, and maintain robust non-WordPress websites from the ground up.

---
##🚀 Quick Start

To test the application locally:

#1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/compendium.git
```
```bash
cd compendium
```
#2️⃣ Install Dependencies

Install PHP dependencies:
```bash
composer install
```
Install frontend dependencies:
```bash
npm install
```
#3️⃣ Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```
Generate application key:
```bash
php artisan key:generate
```

If using a database, configure your .env file accordingly.

Run migrations:
```bash
php artisan migrate
```

#4️⃣ Start the Application

In your first terminal (Backend):
```bash
php artisan serve
```
In a second terminal (Frontend / Vite):
```bash
npm run dev
```

5️⃣ Access the App

Open your browser and visit:

http://localhost:8000

Create your account and explore the system.

---

###🧐 Project Overview

**Compendium is a modular Laravel-based web system designed without CMS frameworks. It focuses on:**

**Clean Semantic Structure — HTML5 for accessibility and SEO**

**Responsive Layouts — CSS3 powered by Flexbox and Grid**

**State-Based Interactivity — JavaScript-driven dynamic UI updates**

**Form Handling — Robust validation and event-driven architecture**

**Email Workflow Ready — Prepared for SendGrid, Mailchimp, or SMTP integration**

---
##🛠 Technical Stack
| Layer | Technology |
|---|---|
| Backend | Laravel 12.x |
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Build Tool | Vite |
| Package Manager | NPM |
| Architecture | Modular MVC + Client-side State Logic |

---

###💡 Core Capabilities Demonstrated
**1️⃣ Interactive Logic Handling**

Multi-step user flows

Conditional calculation logic

Dynamic DOM updates without reload

Defensive error handling

Demonstrates ability to debug and stabilize quiz-style or scoring systems.

**2️⃣ Secure Content Access Patterns**

Email-gated content logic

Token-based download flows

File access control strategies

Prevention of direct asset exposure

**3️⃣ Maintainability & Codebase Structure**

Clear naming conventions

Logical separation of backend and frontend

Decoupled routing and controllers

Comment-documented logic

Scalable architecture


---

**To run locally:**
```bash
php artisan serve
```

In another terminal:
```bash
npm run dev
```
Then open:
```bash
http://localhost:8000
```
Create your account and explore the system.
