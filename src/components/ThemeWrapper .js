// ThemeWrapper.js
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar,View } from 'react-native';
import { useSelector } from 'react-redux';

const ThemeWrapper = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    // Set the status bar style based on Dark/Light mode
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={isDarkMode ? 'black' : 'rgba(128, 128, 128, 0)'} // Đổi màu và độ trong suốt tại đây
      />
      {children}
    </>
  );
};

export default ThemeWrapper;
