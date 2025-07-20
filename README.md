# Mindful Attend Track

![License](https://img.shields.io/badge/license-MIT-brightgreen)
![Status](https://img.shields.io/badge/status-active-success)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Built With](https://img.shields.io/badge/built%20with-React%20%7C%20TypeScript%20%7C%20Supabase-blue)

---



<h2 align="center">Mindful Attend Track</h2>

<p align="center">
  <b>AI-powered, real-time event engagement, tracking, and analytics platform for modern hybrid and virtual events.</b>
</p>

---

## 🚀 Overview

Mindful Attend Track is a next-generation event analytics and engagement platform designed for conferences, workshops, expos, and hybrid/virtual events. It provides:
- Real-time participant tracking (QR, NFC, browser, downloads, VR)
- Dynamic engagement scoring and leaderboards
- Live chat with AI moderation and smart suggestions
- Advanced VR analytics (gaze, interaction, device, sponsor ROI)
- Unified dashboards for actionable insights

---

## ✨ Features

### 🏆 Dynamic Scoring & Leaderboards
- Real-time engagement scoring (attendance, participation, resources)
- Adaptive scoring algorithms for different event types
- Live participant leaderboard with detailed breakdowns

### 📊 Multi-Modal Tracking
- QR code, RFID/NFC, browser, and download-based tracking
- Real-time activity feed and unified analytics dashboard
- Session attendance, location heatmaps, device usage

### 🎮 VR Metrics & Analytics
- Gaze tracking, interaction analytics, and session duration
- Device compatibility and performance monitoring
- Sponsor engagement and ROI tracking in VR

### 💬 Live Chat & Communication
- Real-time chat with channels, AI moderation, and typing indicators
- Smart suggestions and networking facilitation
- Online user presence and activity simulation

### 📈 Unified Analytics
- Multi-tab dashboards for overview, live events, sessions, analytics
- Real-time data visualization and performance metrics
- Responsive, modern UI with brass-themed design

---

## 📦 Installation

### 1. **Clone the Repository**
```bash
git clone https://github.com/Priyanshu-Ghosh-unplugged/mindful-attend-track.git
cd mindful-attend-track
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Environment Setup**
- Configure your Supabase credentials in `src/integrations/supabase/client.ts` or via environment variables if required.
- (Optional) Update branding assets in `src/assets/` and `public/`.

### 4. **Run the App Locally**
```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or as specified by Vite).

---

## 🧩 Project Structure

```
├── src/
│   ├── components/         # UI components (Navigation, Hero, Features, etc.)
│   ├── contexts/           # React context providers (Auth, Theme)
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Supabase and other integrations
│   ├── lib/                # Utility functions
│   ├── pages/              # Main app pages (Dashboard, Tracking, VRMetrics, etc.)
│   └── assets/             # Images and static assets
├── public/                 # Static files
├── supabase/               # Supabase config and migrations
├── package.json            # Project metadata and scripts
└── README.md               # This file
```

---

## 🖥️ Key Pages & Dashboards

- **/dashboard**: Main event dashboard with real-time stats
- **/dynamic-scoring**: Engagement scoring, leaderboards, and scoring formula
- **/tracking**: Multi-modal tracking dashboard (QR, NFC, browser, downloads)
- **/vr-metrics**: Advanced VR analytics (gaze, interaction, device, sponsor)
- **/chats**: Live chat with channels, AI, and user presence
- **/sessions**: Session attendance and engagement
- **/analytics**: Device usage, engagement trends, and more

---

## 🛠️ Technologies Used

- **React** (Vite, TypeScript)
- **Supabase** (auth, database, real-time)
- **Tailwind CSS** (custom brass theme)
- **Lucide Icons** (modern iconography)
- **AI/ML** (simulated for demo, pluggable for production)

---

## 🧠 Advanced Capabilities

- **Real-time data streaming** for live dashboards
- **AI-powered moderation and engagement scoring**
- **VR analytics**: gaze heatmaps, device stats, sponsor ROI
- **Multi-device and multi-location support**
- **Extensible architecture** for new tracking methods

---

## 📸 Screenshots

> _Add screenshots/gifs here to showcase dashboards, VR analytics, and chat features._

---

## 🚦 Roadmap
- [x] Multi-modal tracking (QR, NFC, browser, downloads)
- [x] Dynamic scoring and leaderboards
- [x] VR analytics and sponsor ROI
- [x] Live chat with AI moderation
- [ ] Integrate real AI/ML backend
- [ ] Mobile app support
- [ ] Exportable analytics reports
- [ ] More integrations (Zoom, Teams, etc.)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements
- [Supabase](https://supabase.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- All contributors and open-source libraries

---

<p align="center">
  <b>Mindful Attend Track &mdash; Elevate your event analytics and engagement.</b>
</p>
