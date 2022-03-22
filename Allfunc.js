import { async } from '@firebase/util';
import * as ImagePicker from 'expo-image-picker';
import { storage } from './firebase'
import { nanoid } from 'nanoid'
import 'react-native-get-random-values'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';


export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
}
export async function askForPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    return status;
}

export async function uploadImage(uri, path, fName) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        }
        xhr.onerror = function (e) {
            reject(new TypeError("Network request faild"));
        };
        xhr.responseType = 'blob';
        xhr.open("GET", uri, true);
        xhr.send(null)
    });

    const fileName = fName || nanoid();
    const imgeRef = ref(storage, `${path}/${fileName}.jpeg`);

    const snapshot = await uploadBytes(imgeRef, blob, {
        contentType: "image/jpeg"
    })
    // blob.close();

    const url = await getDownloadURL(snapshot.ref);
    return (url, fileName)

}