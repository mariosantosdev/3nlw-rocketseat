import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { BorderlessButton } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface IHeaderProps {
    title: string,
    showCancel?: boolean
}

export default function Header({ title, showCancel = false }: IHeaderProps) {
    const navigation = useNavigation()

    const handleGoBackScreen = () => {
        navigation.goBack()
    }

    const handleGoBackToHomePage = () => {
        navigation.navigate('Map')
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={handleGoBackScreen}>
                <Feather name='arrow-left' size={24} color='#15b6d6' />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleGoBackToHomePage}>
                    <Feather name='x' size={24} color='#ff669d' />
                </BorderlessButton>
            ):(
                <View />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        color: '#8fa7b3'
    }
})