# Java Quest Tracker

A React Native (Expo) mobile app designed to guide you through a **24-week Java learning plan** in preparation for a skillful Java developer. Track daily tasks, test your knowledge with quizzes, and watch your progress grow.

## Features

- **Daily Task Checklist** — See what you need to accomplish each day and check items off as you go. Includes a progress bar, streak counter, and motivational quotes.
- **Quizzes with Spaced Repetition** — Take a 5-question daily quiz drawn from 480+ questions across all 24 weeks. Questions resurface using a spaced-repetition algorithm to reinforce retention.
- **Progress Dashboard** — View phase-by-phase completion, earned achievement badges, and a 30-day activity heatmap.
- **Achievement Badges** — Unlock 9 badges for milestones like completing your first day, maintaining streaks, and finishing phases.
- **Dark Mode** — Toggle between light and dark themes.
- **Push Notifications** — Optional daily reminders to keep you on track.
- **Offline-First** — All data is persisted locally via AsyncStorage.

## Tech Stack

- **Framework**: React Native (Expo managed workflow)
- **Language**: TypeScript
- **State Management**: Zustand with AsyncStorage persistence
- **Navigation**: React Navigation (bottom tabs)
- **Notifications**: expo-notifications

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo` works out of the box)
- iOS Simulator (Xcode) or Android Emulator, or the **Expo Go** app on a physical device

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd javaQuestTracker

# Install dependencies
npm install
```

### Running the App

```bash
# Start the Expo dev server
npx expo start
```

Then press **i** for iOS simulator, **a** for Android emulator, or scan the QR code with Expo Go on your phone.

## Project Structure

```
javaQuestTracker/
├── App.tsx                        # Root component
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Bottom tab navigator
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Daily tasks & checklist
│   │   ├── ProgressScreen.tsx     # Dashboard, badges, heatmap
│   │   ├── QuizScreen.tsx         # Daily quiz with feedback
│   │   └── SettingsScreen.tsx     # Preferences & stats
│   ├── store/
│   │   └── useAppStore.ts         # Zustand store (tasks, quiz, settings)
│   ├── data/
│   │   ├── plan.ts                # 24 weeks of daily tasks
│   │   ├── quizzes/               # Quiz question banks by week
│   │   ├── badges.ts              # Achievement definitions
│   │   ├── quotes.ts              # Motivational quotes
│   │   └── types.ts               # Shared TypeScript types
│   ├── theme/
│   │   └── theme.ts               # Light & dark colour palettes
│   └── utils/
│       ├── dateUtils.ts           # Date helpers
│       ├── spacedRepetition.ts    # SM-2 inspired algorithm
│       └── notifications.ts       # Push notification setup
├── app.json
├── tsconfig.json
└── package.json
```

## The 24-Week Plan

The learning plan is split into three phases:

1. **Weeks 1–4 — Core Java & Fundamentals**: Language basics, OOP, collections, generics, exception handling.
2. **Weeks 5–12 — Intermediate & Frameworks**: Spring Boot, REST APIs, testing (JUnit/Mockito), databases, CI/CD.
3. **Weeks 13–24 — Advanced & Interview Prep**: System design, microservices, concurrency, performance tuning, mock interviews.

## License

This project is for personal use.
