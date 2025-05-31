// src/hooks/useBannerAd.tsx
import { AdMobUnitIds } from '@/src/config/admobConfig';
import { useState } from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


export const useBannerAd = () => {

  const [isLoaded, setIsLoaded] = useState(true);

  const bannerComponent = (
    <BannerAd
        unitId={AdMobUnitIds.BANNER}
        size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
          setIsLoaded(true);
        }}
        onAdFailedToLoad={() => {
          console.log('Banner ad failed');
          setIsLoaded(false);
        }}
      />
  );
  
  return {
    bannerComponent,
    isLoaded
  }
};
