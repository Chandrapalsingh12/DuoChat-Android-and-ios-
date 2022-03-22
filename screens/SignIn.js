import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Context from "../context/Context";
import { auth, signIn, signup } from "../firebase";
import Apploadingfss from "./AppLoadins";
import {
    Rationale_400Regular
} from '@expo-google-fonts/rationale'
import { useFonts } from '@expo-google-fonts/rationale'


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("signUp");
    const [loading, setLoading] = useState(false);
    // const [isValid, setIsValid] = useState(false)
    const [isUserValid, setIsUserValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [checkUser, setcheckUser] = useState(false)
    const [fontLoad] = useFonts({
        Rationale_400Regular

    })

    const [data, setData] = useState('')
    const {
        theme: { colors },
    } = useContext(Context);

    const handelValidUser = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val) === false) {
            setIsUserValid(true)
        } else {
            setIsUserValid(false)
        }
    }
    const handelPassword = (val) => {
        if (val.length < 6) {
            setIsPasswordValid(true)
        } else {
            setIsPasswordValid(false)
        }
    }


    async function handlePress() {
        setLoading(true)
        if (mode === "signUp") {
            try {
                await signup(email, password);

            } catch (error) {
                setLoading(false)
                setcheckUser(true)
                setTimeout(() => {
                    setcheckUser(false)
                }, 6000);
            }
        }

        if (mode === "signIn") {
            try {
                await signIn(email, password);
            } catch (error) {
                setLoading(false)
                setIsPasswordValid(true)
                setTimeout(() => {
                    setIsPasswordValid(false)
                }, 6000);

            }

        }
    }
    return (
        <>
            {loading ? (<Text style={{ alignSelf: "center", flex: 1, height: "100%", backgroundColor: "white" }}> <Apploadingfss /></Text>)
                :
                (


                    <View style={styles.mainConatine}>
                        <View style={styles.imgcont}>
                            <Image style={styles.img} source={require('../assets/images/logo1.png')} />
                            <Text style={{ fontSize: 30, color: "white" }}> Welcome To DuoChat</Text>
                        </View>
                        <View style={styles.container} >
                            <Text style={{ fontSize: 30, marginVertical: 20, fontWeight: "500" }}>{mode === 'signUp' ? 'Signup' : 'Login'} Page</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    onEndEditing={(e) => handelValidUser(e.nativeEvent.text)}
                                />
                                {!isUserValid ? null : <Text style={styles.error}>Check Your Email</Text>}
                                {!checkUser ? null : <Text style={styles.error}>This Email Already Exist</Text>}
                                {!isPasswordValid ? null : <Text style={styles.error}>Check Email or Password</Text>}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={true}
                                // onEndEditing={(e) => handelPassword(e.nativeEvent.text)}
                                />



                                <TouchableOpacity onPress={handlePress} style={styles.btn} disabled={!password || !email}>
                                    <Text style={{ fontSize: 20, color: "white" }}>{mode === "signUp" ? "Sign Up" : "Login"}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => mode === 'signUp' ? setMode('signIn') : setMode('signUp')}

                                >
                                    <Text style={{ textAlign: "center", fontSize: 18 }}>{mode === 'signUp' ? 'Already have an account ? Login' : `Don't have Account Signup`}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View >
                )
            }


        </>

    );
}
const styles = StyleSheet.create({
    mainConatine: {
        height: "100%",
        backgroundColor: "#59806b"
    },
    imgcont: {
        // backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
    },
    img: {
        height: 100,
        width: 100,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "lightgrey",
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50
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
        alignItems: "center"

    },
    error: {
        color: "red",
        marginTop: -10
    }
})