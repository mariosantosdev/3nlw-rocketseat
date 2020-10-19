import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Map from './screens/Map'
import Orphanage from './screens/Orphanage'

import SelectMap from './screens/CreateOrphanage/SelectMapPosition'
import OrphanageData from './screens/CreateOrphanage/OrphanageData'
import Header from './components/Header'

const Stack = createStackNavigator()
export default function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Stack.Screen
                    name="Map"
                    component={Map}
                />
                <Stack.Screen
                    name="Orphanage"
                    component={Orphanage}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />
                <Stack.Screen
                    name="SelectMap"
                    component={SelectMap}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Adicione um Orfanato" />
                    }}
                />
                <Stack.Screen
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Adicione um Orfanato" showCancel />
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    )
}