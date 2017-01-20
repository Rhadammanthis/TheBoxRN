import React from 'react';
import {
	StyleSheet,
	TouchableNativeFeedback
} from 'react-native';
import Swiper from 'react-native-swiper';
import IndividualBox from './IndividualBox';

const MySwiper = () => {
	return (
		<Swiper showsPagination={false} style={styles.wrapper} loop={false}>
			<IndividualBox style={{ flex: 1 }} name={"Polos"} />
			<IndividualBox style={{ flex: 1 }} name={"Tacito"} />
			<IndividualBox style={{ flex: 1 }} name={"Hongo"} />
		</Swiper>
	);
}

const styles = StyleSheet.create({
	wrapper: {
	},
	slide1: {
		flex: 1
	},
	slide2: {
		flex: 1
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	}
});

export default MySwiper;