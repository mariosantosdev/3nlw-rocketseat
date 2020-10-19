import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map_marker.png'
import api from '../services/api';

interface IOrphanage {
	id: number,
	name: string,
	latitude: number,
	longitude: number
}

export default function Map() {
	const [orphanages, setOrphanage] = useState<IOrphanage[]>([])
	const navigation = useNavigation()

	const handleNavigationToOrphanage = (id: number) => {
		navigation.navigate('Orphanage', { id })
	}

	const handleNavigationToCreateOrphanage = () => {
		navigation.navigate('SelectMap')
	}

	useFocusEffect(() => {
		api.get('/orfanatos').then(response => {
			setOrphanage(response.data)
		})
	})

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: -20.6995135,
					longitude: -44.8252459,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				}}
			>
				{orphanages.map(orphanage => {
					return (
						<Marker
							key={orphanage.id}
							icon={mapMarker}
							calloutAnchor={{ x: 2.7, y: 0.8, }}
							coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude, }}
						>
							<Callout onPress={() => handleNavigationToOrphanage(orphanage.id)} tooltip>
								<View style={styles.calloutContainer}>
									<Text style={styles.calloutText}>{orphanage.name}</Text>
								</View>
							</Callout>
						</Marker>
					)
				})}
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

				<RectButton style={styles.createOrphanageButton} onPress={() => handleNavigationToCreateOrphanage()}>
					<Feather name='plus' size={20} color='#fff' />
				</RectButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	calloutContainer: {
		width: 160,
		height: 46,
		paddingHorizontal: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 16,
		justifyContent: 'center'
	},
	calloutText: {
		color: '#0086a5',
		fontSize: 14,
		fontFamily: 'Nunito_700Bold'
	},
	footer: {
		position: 'absolute',
		left: 24,
		right: 24,
		bottom: 32,

		backgroundColor: '#fff',
		borderRadius: 20,
		height: 56,
		paddingLeft: 24,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		elevation: 3,
	},
	footerText: {
		color: '#8FA7B3',
		fontFamily: 'Nunito_700Bold'
	},
	createOrphanageButton: {
		width: 56,
		height: 56,
		backgroundColor: '#15C3D6',
		borderRadius: 20,

		justifyContent: 'center',
		alignItems: 'center'
	},
});
