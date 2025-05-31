// src/hooks/useInterstitialAd.ts
import { useEffect, useState, useCallback, useMemo } from 'react';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { AdMobUnitIds } from '@/src/config/admobConfig';

export const useInterstitialAd = () => {
  const [loaded, setLoaded] = useState(false);

  // Create ad instance only once
  const interstitialAd = useMemo(() => 
    InterstitialAd.createForAdRequest(AdMobUnitIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
    }), []);

  useEffect(() => {
    const loadAd = () => {
      setLoaded(false);
      interstitialAd.load();
    };

    const onAdLoaded = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const onAdClosed = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      interstitialAd.load(); // Preload next ad
    });

    // Load the ad initially
    loadAd();

    // Clean up listeners on unmount
    return () => {
      onAdLoaded();
      onAdClosed();
    };
  }, [interstitialAd]);

  const showAd = useCallback(() => {
    if (loaded) {
      interstitialAd.show();
    }
  }, [loaded, interstitialAd]);

  return { showAd, loaded };
};
