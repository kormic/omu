import { View, Text, StyleSheet, Image } from 'react-native';
import { icons } from '../../../constants';

type HeaderLogin = {
	title: 'Login';
	iconName: 'login';
};

type HeaderRegister = {
	title: 'Register';
	iconName: 'register';
};

type Props = HeaderLogin | HeaderRegister;

const Header = ({ title, iconName }: Props) => {
	const src = icons[iconName];

	return (
		<>
			<View style={styles.header}>
				<Image style={styles.logo} source={require('../../../../assets/omu.png')}></Image>
				<Text style={[styles.text, styles.headerTitle]}>{title}</Text>
				<View style={styles.logo}></View>
			</View>
			<View style={styles.welcomeContainer}>
				<View style={styles.welcomeTextContainer}>
					<Text style={[styles.text, styles.welcomeText]}>Welcome to JivApp</Text>
					<Text style={styles.text}>I want to be a Taker</Text>
					<Text style={styles.text}>I want to receive a Jiver</Text>
				</View>
				<Image style={styles.welcomeImage} source={src}></Image>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	logo: {
		aspectRatio: 1,
		width: 40,
	},
	text: {
		color: '#FFF',
	},
	headerTitle: {
		fontSize: 16,
	},
	welcomeContainer: {
		padding: 35,
	},
	welcomeTextContainer: {
		paddingBottom: 35,
	},
	welcomeText: {
		paddingBottom: 12,
	},
	welcomeImage: {
		alignSelf: 'center',
	},
});

export default Header;
