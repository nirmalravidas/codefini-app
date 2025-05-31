// src/hooks/useRewardedAd.ts
import { useEffect, useState, useCallback } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  RewardedAdReward,
} from 'react-native-google-mobile-ads';
import { AdMobUnitIds } from '@/src/config/admobConfig';

export const useRewardedAd = (onReward?: (reward: RewardedAdReward) => void) => {
  const [loaded, setLoaded] = useState(false);
  const ad = RewardedAd.createForAdRequest(AdMobUnitIds.REWARDED, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    const onAdLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => setLoaded(true));
    const onAdClosed = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(false);
      ad.load();
    });
    const onRewardEarned = ad.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => onReward?.(reward)
    );

    ad.load();

    return () => {
      onAdLoaded();
      onAdClosed();
      onRewardEarned();
    };
  }, []);

  const showAd = useCallback(() => {
    if (loaded) ad.show();
  }, [loaded]);

  return { showAd, loaded };
};
