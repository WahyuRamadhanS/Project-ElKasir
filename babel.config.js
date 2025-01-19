module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Preset for Expo
    plugins: [
      "react-native-reanimated/plugin", // Must always be the last plugin
      [
        "module-resolver",
        {
          root: ["./"], // Root directory for resolving paths
          alias: {
            "@assets": "./templates/assets", // Alias for assets folder
            "@login": "./templates/login and signup", // Alias for login-related screens
            "@screens": "./templates", // Alias for generic screens in templates folder
            "@inventarisScreens": "./inventarisScreens", // Alias for inventarisScreens folder
            "@kasirScreens": "./kasirScreens", // Alias for kasirScreens folder
          },
        },
      ],
    ],
  };
};
