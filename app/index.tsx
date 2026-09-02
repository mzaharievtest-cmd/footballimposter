import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  useEffect(() => {
    (async () => {
      const done = await AsyncStorage.getItem("onboardingDone");
      if (done) {
        router.replace("/home");
      } else {
        router.replace("/onboarding");
      }
    })();
  }, []);

  return null;
}