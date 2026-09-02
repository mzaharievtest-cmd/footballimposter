# Deployment Guide

## First time setup

Run:
```
npm install -g eas-cli
```

Run:
```
eas login
```
(use your Apple Developer account)

Run:
```
eas build:configure
```

## Beta build for TestFlight

Run:
```
eas build --platform ios --profile preview
```

When done run:
```
eas submit --platform ios
```

Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com) and add testers in the TestFlight tab.

## Local simulator build

Run:
```
npx expo run:ios
```

## Production build

Run:
```
eas build --platform ios --profile production
```

Run:
```
eas submit --platform ios
```

## Before first real build you must do

- Replace `YOUR_APP_ID` in `app/settings/index.tsx` with your real App Store app ID
- Replace support email in `app/settings/index.tsx` with your real email
- Create both IAP products in App Store Connect with these exact product IDs: `football_imposter_weekly` and `football_imposter_lifetime`
- Make sure your bundle ID `com.mzahariev.footballimposter` is registered in your Apple Developer account at [developer.apple.com](https://developer.apple.com)
