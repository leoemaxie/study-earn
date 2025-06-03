import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants';

const FormButton = ({ title, onPress, btnStyle, textCtn }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, btnStyle]}>
            <Text style={[styles.text, textCtn]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default FormButton

const styles = StyleSheet.create({
    container: {
        height: SIZES.h1 * 1.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.base,
        marginBottom: SIZES.h4,
    },
    text: {
        ...FONTS.h3,
        color: COLORS.white
    },
})