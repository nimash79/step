# Step

A cross-platform mobile application built with **React Native and Expo**, featuring onboarding, authentication, step-related screens, profile management, and a customizable user experience.

## Overview

Step is a mobile application developed with React Native and Expo. It uses a modular screen structure, stack-based navigation, and centralized state management to organize the user experience.

The application includes dedicated screens for onboarding, authentication, step-related functionality, the main interface, and profile-related features. Its UI is configured for right-to-left (RTL) layouts and includes custom Persian-compatible fonts.

## Features

- **Onboarding:** Introductory flow for new users.
- **Authentication:** Dedicated authentication screen.
- **Step-related interface:** A dedicated screen for the application's core step functionality.
- **Main screen:** Central entry point for the primary application experience.
- **Profile and settings:** Screens for settings, personal information, and user specifications.
- **Achievements:** Dedicated achievements screen.
- **Help and information:** FAQ, About Us, and Contact Us screens.
- **In-app messaging interface:** A dedicated chat screen.
- **RTL layout:** Right-to-left rendering support through React Native's `I18nManager`.
- **Custom typography:** Bundled Persian-compatible fonts.
- **Centralized state management:** Redux Toolkit and React Redux.
- **User feedback:** Toast notifications and a custom splash-screen flow.
- **Mobile build workflow:** Expo development server and EAS Android preview builds.

## Technology Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile UI |
| Expo SDK 51 | Mobile development and native-module integration |
| React Navigation 6 | Stack and bottom-tab navigation |
| Redux Toolkit | Application state management |
| React Redux | Connecting components to Redux |
| Axios | HTTP requests |
| AsyncStorage | Local persistent storage |
| Expo Notifications | Notification handling |
| Expo Location | Location-related functionality |
| Expo Image Picker | Image selection |
| Expo Media Library | Media-library access |
| React Native Maps | Map-based components |
| React Native Reanimated | UI animations |
| React Native Gesture Handler | Gesture interactions |
| Expo Font | Loading bundled fonts |
| Expo Updates | Application update support |
| Expo Application Services (EAS) | Cloud build workflow |

The dependencies listed in `package.json` describe the project's available libraries. Their presence does not necessarily mean every package is used by an active feature.

## Project Structure

```text
step/
├── assets/
│   └── fonts/                  # Bundled application fonts
├── src/
│   ├── components/
│   │   └── modals/             # Reusable modal components
│   ├── redux/                  # Redux store and state logic
│   ├── screens/
│   │   ├── authentication/     # Authentication flow
│   │   ├── main/               # Main application screens
│   │   │   └── Profile/        # Profile and settings screens
│   │   ├── steps/              # Step-related functionality
│   │   ├── IntroScreen.js      # Onboarding screen
│   │   └── SplashScreen.js     # Splash screen
│   └── utils/                  # Shared utilities and alerts
├── App.js                      # Application entry point
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── eas.json                    # EAS build profiles
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
└── README.md
```

This is a high-level view of the codebase; consult the `src` directory for the complete file structure.

## Getting Started

### Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/)
- npm
- [Expo development tools](https://docs.expo.dev/)
- Android Studio and an Android SDK for local Android development, if needed
- Xcode on macOS for local iOS builds, if needed

### 1. Clone the repository

```bash
git clone https://github.com/nimash79/step.git
cd step
```

### 2. Install dependencies

```bash
npm ci
```

This installs the dependencies using the committed lockfile.

### 3. Start the development server

```bash
npm start
```

Expo will start its development server and provide instructions for opening the application in a simulator or on a compatible device.

Because this project uses native dependencies, a development build may be necessary if the required modules are not supported by Expo Go.

### 4. Build an Android preview

The repository defines the following build script:

```bash
npm run build
```

This runs:

```bash
eas build --platform android --profile preview
```

Configure your Expo account and EAS project as required before starting a cloud build. See the [EAS Build documentation](https://docs.expo.dev/build/introduction/).

## Application Architecture

### Navigation

`App.js` configures a native stack navigator using React Navigation. The registered routes include:

- `Intro`
- `Authentication`
- `Steps`
- `Main`
- `HomeModal`
- `Settings`
- `Info`
- `PersonalInformation`
- `Specifications`
- `Faq`
- `AboutUs`
- `ContactUs`
- `Achievements`
- `Chat`

The navigation container is wrapped in a Redux provider, making the configured store available to the application.

### State management

The project uses Redux Toolkit and React Redux for shared state management. This architecture allows state to be accessed across screens without passing every value through multiple component layers.

### Splash screen and fonts

The application loads custom fonts before rendering the main navigation interface. It also includes a splash-screen flow and a short delay before marking the application as ready.

### RTL layout

The application enables and forces right-to-left layout through React Native's `I18nManager`. It also uses bundled Persian-compatible fonts.

Changes to RTL configuration can require an application reload. Test layout changes carefully to ensure that text alignment, navigation, icons, and gestures behave as intended.

## Development Guidelines

When extending the application:

1. Keep screen-specific UI and logic within the relevant screen modules.
2. Reuse shared components for common interface elements.
3. Use Redux for state that must be shared across screens.
4. Keep API calls and error handling consistent.
5. Test layouts on physical devices and simulators.
6. Verify RTL behavior after changing navigation or layout components.
7. Keep dependency versions aligned with the project's Expo SDK.

## Build and Deployment

The project uses Expo and EAS for its mobile development and Android preview build workflow.

For a production release:

- Verify the Expo and native dependency configuration.
- Configure the correct application identifiers and build profiles.
- Test authentication and backend connectivity.
- Review permissions requested by location, media, and notification features.
- Validate the application on supported devices.
- Store credentials and signing configuration securely.

Refer to the [Expo documentation](https://docs.expo.dev/) for development, configuration, and deployment guidance.

## License

No explicit license has been verified for this repository. Review the repository's license information before redistributing or reusing the code.

## Author

**Nima Sharifinia**

- GitHub: [@nimash79](https://github.com/nimash79)
- Repository: [step](https://github.com/nimash79/step)

---

Contributions that improve maintainability, accessibility, reliability, and the mobile user experience are welcome.
