import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    StyleSheet
} from "react-native";
import Constants from "expo-constants";
import GlobalContext from "../context/Context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Apploadingfss from "../screens/AppLoadins";
import {
    Rationale_400Regular
} from '@expo-google-fonts/rationale'
import { useFonts } from '@expo-google-fonts/rationale'


export default function Profile() {
    const [displayName, setDisplayName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [isloading, setIsloading] = useState(false)
    const navigation = useNavigation();
    const [fontLoad] = useFonts({
        Rationale_400Regular

    })


    useEffect(() => {
        (async () => {
            const status = await askForPermission();
            setPermissionStatus(status);
        })();
    }, []);

    const {
        theme: { colors },
    } = useContext(GlobalContext);

    async function handlePress() {
        const user = auth.currentUser;
        let photoURL;
        if (selectedImage) {
            setIsloading(true)

            const { url } = await uploadImage(
                selectedImage,
                `images/${user.uid}`,
                "profilePicture"
            );
            photoURL = url;
        }
        const userData = {
            displayName,
            email: user.email,
        };
        if (photoURL) {
            userData.photoURL = photoURL;
        }

        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
        ]);
        navigation.navigate("home");
    }

    async function handleProfilePicture() {
        const result = await pickImage();
        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    }

    if (!permissionStatus) {
        return <Text>Loading</Text>;
    }
    if (permissionStatus !== "granted") {
        return <Text>You need to allow this permission</Text>;
    }
    return (
        // <React.Fragment>
        //     <StatusBar style="auto" />
        //     <View
        //         style={{
        //             alignItems: "center",
        //             justifyContent: "center",
        //             flex: 1,
        //             paddingTop: Constants.statusBarHeight + 20,
        //             padding: 20,
        //         }}
        //     >
        //         <Text style={{ fontSize: 22, color: colors.foreground }}>
        //             Profile Info
        //         </Text>
        //         <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
        //             Please provide your name and an optional profile photo
        //         </Text>
        //         <TouchableOpacity
        //             onPress={handleProfilePicture}
        //             style={{
        //                 marginTop: 30,
        //                 borderRadius: 120,
        //                 width: 120,
        //                 height: 120,
        //                 backgroundColor: colors.background,
        //                 alignItems: "center",
        //                 justifyContent: "center",
        //             }}
        //         >
        //             {!selectedImage ? (
        //                 <MaterialCommunityIcons
        //                     name="camera-plus"
        //                     color={colors.iconGray}
        //                     size={45}
        //                 />
        //             ) : (
        //                 <Image
        //                     source={{ uri: selectedImage }}
        //                     style={{ width: "100%", height: "100%", borderRadius: 120 }}
        //                 />
        //             )}
        //         </TouchableOpacity>
        //         <TextInput
        //             placeholder="Type your name"
        //             value={displayName}
        //             onChangeText={setDisplayName}
        //             style={{
        //                 borderBottomColor: colors.primary,
        //                 marginTop: 40,
        //                 borderBottomWidth: 2,
        //                 width: "100%",
        //             }}
        //         />
        //         <View style={{ marginTop: "auto", width: 80 }}>
        //             <Button
        //                 title="Next"
        //                 color={colors.secondary}
        //                 onPress={handlePress}
        //                 disabled={!displayName}
        //             />
        //         </View>
        //     </View>
        // </React.Fragment>
        <>
            {isloading ? (<Text style={{ alignSelf: "center", flex: 1, height: "100%", backgroundColor: "white" }}><Apploadingfss /></Text>)
                :
                (

                    <React.Fragment>
                        <StatusBar style='auto' />
                        <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 100 }}>
                            <Text style={{ fontSize: 40, color: "#59806b", fontFamily: "Rationale_400Regular" }}>Complete Profile</Text>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 24, color: "black" }}>Enter Profile Name and Profile Photo</Text>

                            <TouchableOpacity
                                style={styles.camera}
                                onPress={handleProfilePicture}
                            >
                                {!selectedImage ?
                                    (<Ionicons name="ios-camera-outline" size={40} color="white" />)
                                    : <Image
                                        source={{ uri: selectedImage }}
                                        style={{ height: "100%", width: "100%" }}
                                    />}
                            </TouchableOpacity>
                            <TextInput placeholder='Enter your name' style={styles.input} value={displayName} onChangeText={setDisplayName} />

                            <View>
                                <TouchableOpacity style={styles.btn} onPress={handlePress} disabled={!displayName}>
                                    <Text style={{ fontSize: 20, fontWeight: "normal", color: "white" }}>Next</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </React.Fragment>
                )
            }


        </>
    );
}


const styles = StyleSheet.create({
    camera: {
        marginTop: 20,
        borderRadius: 120,
        height: 120,
        width: 120,
        backgroundColor: "#59806b",
        alignItems: "center",
        justifyContent: "center"

    },
    input: {
        height: 50,
        width: 300,
        fontSize: 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    btn: {
        backgroundColor: "#59806b",
        padding: 12,
        marginVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        width: 200

    }
})