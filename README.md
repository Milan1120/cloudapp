# Cloud Storage App

Our cloud storage platform provides a secure, scalable, and easy-to-use solution for storing and managing your data. With seamless access across devices, users can store, retrieve, and share files anytime, anywhere. Built with strong encryption and real-time synchronization, we ensure your data remains safe and always accessible. 

---

## Table of Contents

1. [Introduction](#introduction)
2. [Objective](#objective)
3. [Key Features](#key-features)
4. [Technologies Used](#technologies-used)
5. [Development Tools](#development-tools)
6. [Installation and Setup](#installation-and-setup)
7. [Usage](#usage)
8. [Database Design](#database-design)
9. [UI/UX Workflow](#uiux-workflow)
10. [API Endpoints](#api-endpoints)
11. [Contributing](#contributing)
12. [License](#license)

---

## Introduction

Our cloud storage platform is highly useful for both individuals and businesses by providing a secure and scalable solution to store, manage, and share files. It eliminates the need for physical storage devices, offering easy access from any location or device. With features like real-time syncing, data encryption, and seamless collaboration, it ensures data security, accessibility, and efficiency. Whether handling personal files or large-scale business data, the platform adapts to your needs, simplifying file management and enhancing productivity.

---

## Objective

### Here’s the objective of the cloud storage platform in points:

1. Provide secure and encrypted data storage.

2. Ensure scalable storage solutions to meet growing data needs.

3. Offer seamless access and file management across devices.

4. Enable real-time synchronization to keep data up-to-date.

5. Simplify collaboration and file sharing for teams.

6. Enhance productivity by making data easily accessible from anywhere.

7. Deliver a user-friendly interface for effortless file management.

8. Ensure reliable performance for both individual and business users.

---

## Key Features

Here are the key features of the cloud storage platform:

- **Secure Data Encryption**: Protects your files with end-to-end encryption for maximum data security.
- **Scalability**: Easily expand storage as your data needs grow.
- **Real-Time Syncing**: Ensures your files are always up-to-date across all devices.
- **Cross-Device Access**: Access files from any device, anytime, anywhere.
- **File Sharing & Collaboration**: Simple and secure file sharing with team collaboration features.
- **User-Friendly Interface**: Intuitive design for easy navigation and file management.
- **Automatic Backup**: Safeguards your data with regular automated backups.
- **Offline Access**: Download files for access even without an internet connection.

---

## Technologies Used

### Mobile Development
- **React Native**: Cross-platform mobile development for both iOS and Android.

### Backend Development
- **Node.js**: Server-side JavaScript for handling requests
- **Express.js**: Web framework for building APIs
- **SQL (MySQL/PostgreSQL)**: Database management for property listings, user data, and transactions

### Cloud Infrastructure
- **AWS (Amazon Web Services)**: Cloud hosting, storage (S3), and database services (RDS)

### Other Tools
- **Firebase**: For push notifications and real-time updates
- **Google Maps API**: For property location services and GPS-based recommendations
- **Stripe/PayPal API**: Secure payment gateway integration

---

## Development Tools

- **Android Studio**: For testing the Android version of the app
- **Xcode**: For testing and building the iOS version of the app
- **VSCode**: The primary code editor used during development
- **React Native CLI**: To initialize and manage the React Native project
- **Postman**: For testing and debugging API endpoints
- **Git & GitHub**: Version control and collaboration
- **Firebase**: For managing notifications and app analytics
- **AWS Console**: For managing backend infrastructure (EC2, S3, RDS)

---

## Installation and Setup

1. Go to the file manager and make the folder in it and open cmd there and clone the repo.

2. Clone the repository:
   ```bash
   git clone
   https://github.com/DortexAi/Cloud-App.git

3. After the clone open the Visual Studio to run that project.

4. To run that project you can type:
``` bash
  npm install to install dependencies (if using npm)
   ```
   ``` bash
    Yarn install to install dependencies (if using Yarn)
   ```
   5. After the installation, you can run the project with the following command:
   ```bash
    npx react-native start to start the Metro bundler
   ```
   ```
   npx react-native run-android to run the project on an Android emulator/device
   ```
   ```
   npx react-native run-ios to run the project on an iOS simulator (for Mac users)
   ```
   # Setting Up SDK for Android and iOS in React Native

   1. Android SDK Setup
To run React Native on Android, you need to set up the Android SDK properly.

 ## Step-by-Step Guide for Android SDK Setup:
   2. Install Android Studio:
   Download and install Android Studio on your system.

   During installation, make sure to check the box for installing the Android SDK, Android SDK Platform, and Android Virtual Device (AVD).

 ## Set up Android SDK in Android Studio:

Open Android Studio and go to the "Preferences" or "Settings" (depending on your platform).

In the left pane, expand "Appearance & Behavior" > "System Settings" > "Android SDK".

Select the SDK Platforms tab and ensure you have installed the Android 12 (API Level 31) or newer version.

 ### Switch to the SDK Tools tab and make sure the following are checked:
Android SDK Build-Tools

Android Emulator

Android SDK Platform-Tools

Intel x86 Emulator Accelerator (HAXM installer)

 #### Click OK to install.

Set Android SDK Environment Variables: You need to set up environment variables to point to your Android SDK.

# On windows:

Right-click on This PC > Properties > Advanced system settings > Environment Variables.

Under User variables, click New and add:

Variable name :
```
ANDROID_HOME
```
Variable value : 
```
C:\Users\YourUsername\AppData\Local\Android\Sdk
```
Add this to the Path environment variable:
``` bash
%ANDROID_HOME%\emulator

%ANDROID_HOME%\platform-tools

%ANDROID_HOME%\tools

%ANDROID_HOME%\tools\bin
```
 #### Enable USB Debugging on Android Device (for physical devices):

Go to Settings > About phone > Tap Build Number 7 times to enable developer mode.

Go to Developer options and enable USB debugging.

Install Android Emulator (Optional): If you want to run the app on an Android Emulator, go to Android Studio > AVD Manager and create a virtual device.

# IOS SDK Setup (Mac Only)
To run React Native on iOS, you need Xcode and the iOS SDK. This is only available on macOS.

Step-by-Step Guide for iOS SDK Setup:
Install Xcode:

Download and install Xcode from the Mac App Store.
Once installed, open Xcode and go to Preferences > Locations, and ensure the Command Line Tools dropdown is set to the Xcode version you installed.

Install Xcode Command Line Tools: Run this command in the terminal to install command-line tools:

``` bash
xcode-select --install
```
1. Install CocoaPods (for iOS Dependencies):

2. CocoaPods is required to manage iOS dependencies.

3. Install CocoaPods using the following command:

``` bash
sudo gem install cocoapods
```
4. Navigate to your React Native project and install the iOS dependencies:
``` bash
cd ios/
pod install
```
## IOS Simulator:

You can run your app on an iOS simulator by selecting a device in Xcode.

Use the following command to run the iOS simulator for React Native:
``` bash
npx react-native run-ios
```
## Verifying Installation:
#### For Android, verify if the SDK is properly set up by running:
```bash
adb devices
```
 #### This should list any connected or emulated Android devices.

For iOS, verify that Xcode is installed and working by opening Xcode and running any app in the simulator.

After setting up the SDKs, you should be able to run the project on Android or iOS with the respective commands (npx react-native run-android or npx react-native run-ios).



# File Structure:
<details>
   <summary>File Structure - Click to Expand</summary>
   <pre><code>+---assets
|   |   hd-svgrepo-com.svg
|   |   pdf-svgrepo-com.svg
|   |   Search.png
|   |   storage-svgrepo-com.svg
|   |   tv-free-2-svgrepo-com.svg
|   |   upload-twice-square-svgrepo-com.svg
|   |
|   +---Icons and Images
|   |   |   AddFileIcon.jsx
|   |   |   Apps.png
|   |   |   check-circle-svgrepo-com.svg
|   |   |   delete-svgrepo-com.svg
|   |   |   earth-svgrepo-com.svg
|   |   |   edit-3-svgrepo-com.svg
|   |   |   edit-svgrepo-com.svg
|   |   |   feedback-svgrepo-com.svg
|   |   |   gift-svgrepo-com.svg
|   |   |   help-svgrepo-com.svg
|   |   |   log-out-svgrepo-com.svg
|   |   |   more-svgrepo-com.svg
|   |   |   notification_ 1.svg
|   |   |   premium-svgrepo-com.svg
|   |   |   privacy-dashboard-svgrepo-com.svg
|   |   |   settings-svgrepo-com.svg
|   |   |   share-icon.svg
|   |   |   share-svgrepo-com.svg
|   |   |   undraw_add_files_re_v09g 1.svg
|   |   |   undraw_compose_music_re_wpiw 1.svg
|   |   |   undraw_mobile_payments_re_7udl 1.svg
|   |   |   undraw_no_data_re_kwbl 1.svg
|   |   |   undraw_photos_re_pvh3 1.svg
|   |   |   undraw_secure_login_pdn4 1.svg
|   |   |   undraw_undraw_apps_bqvc_-1-_kcl1 1.svg
|   |   |   undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-cl95_o7o8_pigd-1-wbm3_t5p8-1-mt5l-2-dhxr-2-_nmxe 1.svg
|   |   |   undraw_video_files_fu10 1.svg
|   |   |   UPI_svg.svg
|   |   |
|   |   \---images
|   |           Benefit_image.png
|   |           bin.png
|   |           folder.png
|   |           music.png
|   |           photo.png
|   |           Vaault.png
|   |           video_folder.png
|   |
|   +---Logo
|   |   |   Logofinal1.png
|   |   |   logoFinal2.svg
|   |   |
|   |   \---JUnk
|   |           Logo.png
|   |           Logo2.png
|   |           Logo3.png
|   |           Logo4.png
|   |
|   \---new
|           camera.png
|           exit.png
|           eye.png
|           googleLogo.png
|           hidden.png
|           information.png
|           logoFinal21.png
|           luxury.png
|           person.png
|           setting.png
|           undraw_forgot_password_re_hxwm.png
|           undraw_mobile_login.png
|           undraw_mobile_signup.png
|
+---commanScreen
|       CheckInternet.tsx
|
+---component
|       HomeComponent.tsx
|       MusicComponent.tsx
|       SettingComponent.tsx
|
+---Components
|   |   Arrowback.tsx
|   |   CategoryCard.tsx
|   |   HomeListcard.tsx
|   |   ImagePickerButton.tsx
|   |   ListCard.tsx
|   |   MoreOptionCard.tsx
|   |   PrimiumCard.tsx
|   |
|   \---SVG
|       |   FolderIcon.jsx
|       |   MusicIcon.jsx
|       |   NotificationbellIcon.jsx
|       |   PhotoIcon.jsx
|       |   SearchEngineIcon.jsx
|       |   VaultIcon.jsx
|       |   VideoFolderIcon.jsx
|       |
|       \---Icons
|               ArrowLeftIcon.jsx
|               CameraIcon.jsx
|               CheckCircleIcon.jsx
|               CirclePlayIcon.jsx
|               ComposeMusicIcon.jsx
|               DeleteIcon.jsx
|               EarthIcon.jsx
|               Edit3Icon.jsx
|               EditIcon.jsx
|               FeedbackIcon.jsx
|               FileIcon.jsx
|               GiftIcon.jsx
|               GridIcon.jsx
|               HDIcon.jsx
|               HelpIcon.jsx
|               HomeIcon.jsx
|               ImageIcon.jsx
|               ListIcon.jsx
|               LogoIcon.jsx
|               LogOutIcon.jsx
|               MoreIcon.jsx
|               MoreVertical.jsx
|               NoDataVetorImage.jsx
|               NotificationIcon.jsx
|               PdfSvg.jsx
|               PremiumIcon.jsx
|               PrivacyIcon.jsx
|               SecureLogin.jsx
|
+---header
|       Search_Bar.tsx
|       SimpleHeader.tsx
|
+---notification
|       NotificationPage.tsx
|
+---recyclebin
|       RecycleBin.tsx
|
+---redux
|   |   store.tsx
|   |
|   \---reducer
|           userSlice.tsx
|
+---routeNavigation
|       Auth.tsx
|       RouteNavigation.tsx
|       TabNavigation.tsx
|       UserNavigation.tsx
|
+---screens
|       EmailLoginPage.tsx
|       LandingPage.tsx
|       PhoneLoginPage.tsx
|       ResetPassword.tsx
|       SignupPage.tsx
|
+---StartingScreens
|       SplashScreen.tsx
|
+---tabcomponent
|       FilesComponent.tsx
|       ImagesComponent.tsx
|       UserComponent.tsx
|       VideoComponent.tsx
|
\---user
        Edituser.tsx
        Help.tsx
        Premium.tsx
        Privacy_Policy.tsx
        Settings.tsx
   </pre></code>

</details>
 ## Contributing

Contributions are welcome! If you'd like to work on this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

Please make sure your code passes all linting and tests before submitting a pull request.

# How to solve the common errors in this project.
In a React Native project, you may encounter various types of errors, which can range from syntax errors, issues with third-party libraries, performance problems, and platform-specific bugs.

## Below are some common errors and solutions for each:

 ### 1. Module Not Found / Import Errors
Error: "Module not found: Can't resolve 'xyz' in 'your_project'." Cause: This error typically occurs when a required package is not installed or incorrectly imported. 

Solution:

Ensure the module is installed by running: npm install package-name or yarn add package-name.
Double-check the import statement to make sure the path is correct.

 ### 2. Metro Bundler Fails to Load
Error: "Metro bundler has encountered an error." Cause: This often happens when the bundler cache is outdated or corrupt. 

Solution:

Clear the cache: Run npx react-native start --reset-cache.
Restart the bundler.
### 3. Failed to Load Assets
Error: "Unable to resolve 'image.png' as an asset." Cause: This usually occurs when the image path is incorrect or the asset is missing. 

Solution:

Check if the image is located in the correct directory.
Use the correct relative path for loading assets.

### 4. Inconsistent Behavior on iOS and Android
Error: The app works on Android but breaks on iOS or vice versa. Cause: React Native components behave slightly differently on Android and iOS platforms. 

Solution:

Test your app thoroughly on both platforms.
Use platform-specific code using Platform.OS to handle these inconsistencies.

### 5. React Native Version Incompatibilities
Error: "Could not find a version that satisfies the requirement." Cause: You may encounter issues when upgrading or downgrading the React Native version due to compatibility issues with libraries.

 Solution:

Review the documentation of third-party libraries to ensure compatibility with the React Native version you're using.
Consider upgrading or downgrading the library versions as needed.

### 6. Out-of-Memory Crashes
Error: The app crashes with no clear error, particularly on lower-end devices. Cause: This often occurs due to memory leaks, handling large datasets, or inefficient rendering. 

Solution:

Optimize images and other assets.
Reduce the amount of data stored in state.
Use FlatList instead of ScrollView for large lists.

### 7. App Not Running on Emulator/Simulator
Error: "App failed to launch on the emulator." Cause: This can be due to emulator issues or build process failure. Solution:

Ensure your emulator is properly configured.
Clean the build and run again: cd android && ./gradlew clean (for Android) or Xcode -> Clean Build Folder (for iOS).
### 8. Missing Permissions
Error: Features like location, camera, or notifications do not work. Cause: This can occur when you forget to request the necessary permissions. Solution:

Add the required permissions in the AndroidManifest.xml (for Android) or Info.plist (for iOS).
### 9. Async Storage Errors
Error: "Warning: AsyncStorage has been extracted from react-native core." Cause: AsyncStorage was moved from the core package into its own library. Solution:

Install AsyncStorage using: npm install @react-native-async-storage/async-storage.
### 10. Third-party Library Compatibility
Error: "Invariant Violation: Native module cannot be null." Cause: This is common when native modules are not linked correctly or when there are version mismatches. Solution:

For React Native <0.60: Link the library manually: react-native link package-name.
For React Native >=0.60: Use auto-linking or check for proper installation and compatibility

### 11. After the importing new library.

Some time we have to face error like gradle.bat is not running properly which fail your build again and again.

Solution:

1. Delete the node_modules folder and then run npm install or yarn install to reinstall the packages.

2. Delete the android/app/build folder and then run react-native run-android to rebuild the project.

## Contact

For any questions or feedback, feel free to reach out:
- Email: [info@dortexai.com](mailto:your-email@example.com)