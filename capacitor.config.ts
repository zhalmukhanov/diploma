import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'diplomaApp',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    "allowNavigation": [
      "http://7132-api.tech/"
    ]
  }
};

export default config;
