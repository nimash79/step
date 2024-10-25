import { StyleSheet, Text, View } from 'react-native'

const MainLayout = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBF7FF",
        paddingHorizontal: "5%",
    }
})