import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
	expo: {
		name: 'omu',
		slug: 'omu',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		newArchEnabled: true,
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			bundleIdentifier: 'com.komicgr.omu',
			supportsTablet: true,
		},
		android: {
			package: 'com.komicgr.omu',
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './assets/favicon.png',
		},
	},
};
