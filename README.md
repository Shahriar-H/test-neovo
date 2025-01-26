# React Native CLI Project

## Getting Started

This guide will help you set up and run this React Native CLI project on your local machine. Follow the steps below:

---

## Prerequisites

Before proceeding, ensure you have the following installed on your system:

1. **Node.js** (Recommended: LTS version)
   - Download from [Node.js Official Website](https://nodejs.org/).

2. **React Native CLI**
   - Install globally using:
     ```bash
     npm install -g react-native-cli
     ```

3. **Java Development Kit (JDK)**
   - Required for Android development.
   - Download and install the latest JDK from [Oracle](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).

4. **Android Studio** (For Android Development)
   - Download from [Android Studio](https://developer.android.com/studio).
   - Install and set up:
     - SDK Manager: Install **Android SDK Platform** and **Android Virtual Device (AVD)**.
     - Environment Variables: Add `ANDROID_HOME` to your system environment variables.

5. **Xcode** (For iOS Development on macOS only)
   - Install Xcode from the Mac App Store.
   - Open Xcode and install additional tools if prompted.

6. **Watchman** (Optional, recommended for macOS)
   - Install using Homebrew:
     ```bash
     brew install watchman
     ```

---

## Clone the Repository

1. Open your terminal and navigate to the directory where you want to store the project.

2. Clone the project repository:
   ```bash
   git clone <repository-url>
   ```

3. Navigate to the project folder:
   ```bash
   cd <project-folder>
   ```

---

## Install Dependencies

1. Install the required Node.js dependencies:
   ```bash
   npm install
   ```

2. If you're using Yarn:
   ```bash
   yarn install
   ```

---

## Running the App

### For Android:

1. Start the Metro bundler:
   ```bash
   npm start
   ```
   (Leave this terminal running.)

2. Open a new terminal and run:
   ```bash
   npx react-native run-android
   ```

3. Ensure that:
   - An Android emulator is running, OR
   - A physical Android device is connected with USB debugging enabled.

### For iOS (macOS Only):

1. Install iOS pods:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. Start the Metro bundler:
   ```bash
   npm start
   ```

3. Open a new terminal and run:
   ```bash
   npx react-native run-ios
   ```
   - This will launch the app on the iOS simulator.

---

## Additional Commands

- To clean the build:
  ```bash
  cd android && ./gradlew clean && cd ..
  ```

- To reset Metro bundler cache:
  ```bash
  npm start --reset-cache
  ```

---

## Troubleshooting

- **Metro Bundler Stuck:** Restart the bundler with `npm start --reset-cache`.
- **Android Build Issues:** Ensure that `ANDROID_HOME` is properly set in your environment variables.
- **iOS Build Issues:** Open the project in Xcode and resolve any issues under "Signing & Capabilities."

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out via Issues or Pull Requests if you encounter any problems or have suggestions!

