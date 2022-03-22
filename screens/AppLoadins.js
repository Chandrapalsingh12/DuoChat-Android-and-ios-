// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import AnimatedLottieView from 'lottie-react-native'
// const Apploadingfss = () => {

//     return (
//         <View style={[StyleSheet.absoluteFillObject, styles.container]}>

//             <AnimatedLottieView style={{ flex: 1 }} source={require('../assets/images/load1.json')} autoplay loop />

//         </View>

//     )
// }

// export default Apploadingfss

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: "center",
//         alignItems: "center",
//         // backgroundColor: "rgb(0,0,0)",
//         zIndex: 1
//     }
// })
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Apploadingfss extends React.Component {
    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    resetAnimation = () => {
        this.animation.play();
    };

    render() {
        return (
            <View style={styles.animationContainer}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 400,
                        height: 400,

                        // backgroundColor: '#eee',
                    }}
                    source={require('../assets/images/load4.json')}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

});