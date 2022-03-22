import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import GlobalContext from "../context/Context";
import { useNavigation } from "@react-navigation/native";
export default function ContactsFloatingIcon() {
    // const {
    //     theme: { colors },
    // } = useContext(GlobalContext);
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("contacts")}
            style={{
                position: "absolute",
                right: 20,
                bottom: 20,
                borderRadius: 60,
                width: 60,
                height: 60,
                backgroundColor: "#59806b",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 20
            }}
        >
            <Ionicons
                name="chatbubble-ellipses-outline"
                size={30}
                color="white"
                style={{ transform: [{ scaleX: -1 }] }}
            />
        </TouchableOpacity>
    );
}
