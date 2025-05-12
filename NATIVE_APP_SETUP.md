# Native App Setup with Capacitor

This guide explains how to take your Next.js PWA and wrap it using Capacitor to create native iOS and Android projects. This allows you to build and deploy your app to the Apple App Store and Google Play Store.

## Prerequisites

1.  **Node.js and npm/yarn:** Ensure you have Node.js (which includes npm) installed.
2.  **Native SDKs:**
    *   **For iOS:** macOS with Xcode installed.
    *   **For Android:** Android Studio installed and configured.
3.  **Capacitor CLI:** While listed as a dev dependency, you might need it globally or use `npx`.
    ```bash
    npm install -g @capacitor/cli
    # or
    yarn global add @capacitor/cli
    ```

## Initial Setup (if not already done via script)

If you haven't used the `npm run cap:init` script yet:

1.  **Initialize Capacitor:**
    In your project root, run:
    ```bash
    npx cap init "Tiny Scholars Hub" "com.tinyscholarshub.app" --web-dir=out
    ```
    *   Replace `"Tiny Scholars Hub"` with your desired app name.
    *   Replace `"com.tinyscholarshub.app"` with your unique app ID (reverse domain style).
    *   `--web-dir=out` points to the default output directory for Next.js static exports.

## Important: Web Directory and Next.js Build

Capacitor works best by bundling your web app's static assets.

*   **Static Export (Recommended for Bundling):**
    To make your Next.js app exportable as static files, you need to configure it for static site generation (SSG).
    1.  Modify your `next.config.ts` to include `output: 'export'`:
        ```typescript
        // next.config.ts
        import type {NextConfig} from 'next';

        const nextConfig: NextConfig = {
          output: 'export', // Add this line
          // ... other configurations ...
          images: {
            unoptimized: true, // Required for static export if using next/image
          },
        };

        export default nextConfig;
        ```
    2.  When building for Capacitor, use:
        ```bash
        npm run build 
        # This will generate static files in the 'out' directory
        ```
        The `cap:sync:static` script `npm run build && npm run export && npx cap sync` in `package.json` assumes older Next.js. With `output: 'export'`, just `npm run build` is sufficient before `npx cap sync`. You might want to update the script.

*   **Critical Note on Server-Side Features:**
    Using `output: 'export'` will **disable Next.js server-side features** like:
    *   Server Components (those with `'use server';` at the top, other than Server Actions).
    *   API Routes (defined in `src/app/api` or `pages/api`).
    *   Server Actions (forms using `action={serverActionFunction}`).
    *   Dynamic rendering that relies on a Node.js server.

    **Your application currently uses Server Actions (e.g., `src/actions/smart-update-actions.ts` and Genkit flows defined with `'use server'`). These will NOT work in a statically exported app bundled with Capacitor.**

    **Solutions:**
    1.  **Refactor to Client-Side API Calls:** Convert all server-dependent logic into API endpoints hosted on a separate backend server. Your client-side code (running in the Capacitor WebView) will then make `fetch` requests to these APIs.
    2.  **Capacitor Loads Remote URL:** Instead of bundling `webDir`, configure Capacitor to load your live, deployed Next.js application URL. This keeps server features intact but means the app requires an internet connection to function. This is less "native-like" for offline capabilities. To do this, you'd modify `capacitor.config.ts` to include a `server.url` property.

## Adding Native Platforms

1.  **Add iOS Platform:**
    ```bash
    npx cap add ios
    # or use the script: npm run cap:add:ios
    ```
2.  **Add Android Platform:**
    ```bash
    npx cap add android
    # or use the script: npm run cap:add:android
    ```
    This will create `ios` and `android` folders in your project root. These are native project folders.

## Syncing Your Web App with Native Projects

After making changes to your web app code:

1.  **Build your Next.js app (for static export):**
    ```bash
    npm run build
    # This generates the 'out' folder if output: 'export' is set.
    ```
2.  **Sync with Capacitor:**
    This command copies your web assets (`out` folder) into the native projects.
    ```bash
    npx cap sync
    # or for the full static workflow: npm run cap:sync:static (adjust this script if you use output: 'export')
    ```

## Running on Devices/Simulators

1.  **Open iOS Project in Xcode:**
    ```bash
    npx cap open ios
    # or use the script: npm run cap:open:ios
    ```
    Xcode will open. From there, you can select a simulator or a connected device and run the app.

2.  **Open Android Project in Android Studio:**
    ```bash
    npx cap open android
    # or use the script: npm run cap:open:android
    ```
    Android Studio will open. From there, you can select an emulator or a connected device and run the app.

## Native Configuration

You'll need to configure native aspects like app icons, splash screens, permissions, etc., directly within the native projects (Xcode for iOS, Android Studio for Android).

*   **App Icons & Splash Screens:** Capacitor can help generate these. See the Capacitor documentation for `cordova-res` or similar tools, or manually add them in the native projects. The `capacitor.config.ts` has a `SplashScreen` plugin section to get you started.
*   **Permissions:** If your app needs native permissions (e.g., camera, location), you'll need to configure these in `Info.plist` (iOS) and `AndroidManifest.xml` (Android), and potentially use Capacitor plugins to request them at runtime.

## Addressing the "Back Arrows" Issue

Native apps have platform-specific navigation controls (like back buttons). When you wrap a web app in Capacitor, the WebView doesn't automatically get these.

*   **Capacitor's Role:** Capacitor provides the container (WebView). It doesn't magically transform your web UI into native UI components.
*   **Web-Based Navigation:** You'll continue to use your web app's navigation (e.g., Next.js router, link components).
*   **Simulating Native Feel:**
    *   For a "back" button functionality within your web UI that feels native, you might need to implement custom UI that uses `window.history.back()` or your router's back functionality.
    *   Consider using UI libraries that offer components styled to look like native iOS or Android elements if that's a high priority.
    *   For true native navigation bars/toolbars, you would need to build parts of your UI with native code or use Capacitor plugins that provide such native UI shells (more advanced).

## Development Workflow

1.  Develop your web features in Next.js as usual (`npm run dev`).
2.  When ready to test on native:
    *   Build your Next.js app (`npm run build` if using `output: 'export'`).
    *   Sync with Capacitor (`npx cap sync`).
    *   Open in Xcode/Android Studio (`npx cap open ios` or `npx cap open android`) and run.

**Live Reload with Native Projects:**
Capacitor supports live reload. You can run your Next.js dev server and configure Capacitor to load from it. This is useful during development but not for production builds. Modify `capacitor.config.ts`:
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  // ...
  server: {
    url: 'http://YOUR_LOCAL_IP_ADDRESS:3000', // Replace with your machine's IP and Next.js port
    cleartext: true // May be needed for Android if not using HTTPS locally
  }
  // ...
};
```
Then run `npx cap sync` and rebuild/rerun from the native IDE. Your native app will load content from your Next.js dev server.

## Conclusion

Capacitor is a powerful tool for bringing web apps to native platforms. Be mindful of the implications of static export on server-side features. You may need to adjust your application's architecture to fully leverage Capacitor for app store distribution. Refer to the official [Capacitor Documentation](https://capacitorjs.com/docs) for more detailed information.
