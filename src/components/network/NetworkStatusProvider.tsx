import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useThemeColors } from '@/src/hooks/useThemeColors';

const NetworkStatusProvider = () => {

  const colors = useThemeColors();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? true;
      setShowModal(!connected);
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={showModal}
      statusBarTranslucent
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
          <Text className="text-lg font-bold text-red-600 mb-2">
            No Internet Connection
          </Text>
          <Text className="text-center text-gray-600 mb-4">
            Please check your internet connection {'\n'} and try again.
          </Text>
          <TouchableOpacity
            onPress={handleRetry}
            className="px-5 py-2 rounded-full bg-red-600"
          >
            <Text className="text-white font-semibold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NetworkStatusProvider;
