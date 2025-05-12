
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tinyscholarshub.app',
  appName: 'Tiny Scholars Hub',
  webDir: 'out', // This assumes you will use static export ('next export' or output: 'export' in next.config.js)
  bundledWebRuntime: false, // Set to true if you're not loading Capacitor via <script> tag (recommended for modern setups)
  // server: {
  //   androidScheme: 'https', // Use 'https' for live-reload with Android
  //   // url: 'http://192.168.1.100:3000' // Example: For live reload, point to your Next.js dev server IP
  // },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff", // Match your app's launch screen color
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
