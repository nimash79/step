import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const CustomHeader = ({children, style = null}) => {
  return (
    <CustomText fontStyle='bold' style={[styles.content, style]}>{children}</CustomText>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    content: {
        fontSize: 20,
    }
})