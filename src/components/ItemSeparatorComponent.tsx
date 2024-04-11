import React from 'react'
import { StyleSheet, View } from 'react-native'

const ItemSeparatorComponent = () => {
    return (
        <View style={styles.separator} />
    )
}

const styles = StyleSheet.create({
    separator : {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBlockColor: 'gray'
    }
})

export default ItemSeparatorComponent;