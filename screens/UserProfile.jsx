import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Image } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
    const user = auth.currentUser
    // const navigation = useNavigation()
    const userLogout = () => {
        auth
            .signOut()
            .then(() => {
                BackHandler.exitApp()
                // navigation.replace("signIn")

            })
            .catch(erro => alert(erro.message))
    }
    return (
        <View style={styles.conatiner}>
            <View style={styles.Imageconatiner}>
                <Image source={{ uri: `${user.photoURL}` }} style={styles.imag} />
            </View>
            <View style={styles.userdetail}>
                <FontAwesome name="user-o" size={30} color="black" />
                <Text style={{ marginLeft: 20, fontSize: 20 }}> Hello {user.displayName}</Text>
            </View>
            <View style={styles.userdetail}>
                <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                <Text style={{ marginLeft: 20, fontSize: 20 }}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.logout} onPress={userLogout}>
                <MaterialIcons name="logout" size={22} color="black" />
                <Text style={{ fontSize: 20, color: "black", paddingLeft: 20 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: "white",
        flex: 1
    },
    Imageconatiner: {
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    imag: {
        height: 200,
        width: 200,
        borderRadius: 100
    },
    userdetail: {
        margin: 30,
        padding: 5,
        flexDirection: "row",
        borderBottomWidth: 1,
    },
    logout: {
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "#59806b",
        marginHorizontal: 30,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row"
    }

})