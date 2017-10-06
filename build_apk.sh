#!/bin/bash

date=$(date +"%d-%m-%y-%H:%M")
export ANDROID_HOME=$ANDROID_HOME

rm -rf style2door*.apk

# ADD platforms
#ionic cordova platform add ios
ionic cordova platform add android


# Creando archivo gradle.properties para android
echo "cdvReleaseSigningPropertiesFile=${ANDROID_HOME}/ant.properties" > platforms/android/gradle.properties

# Construir
ionic cordova build android --release

# facebook key hash
keytool -exportcert -alias 1 -keystore /home/luis/Android/Sdk/my-release-key.keystore | openssl sha1 -binary | openssl base64

#obtener huella digital
#keytool -list -v -keystore /home/luis/Android/Sdk/my-release-key.keystore 


# Verificar
zipalign -v 4 platforms/android/build/outputs/apk/android-release.apk style2door${date}.apk


# SUBIR APK A GOOGLE DRIVE
/home/luis/importante/gdrive-linux-x64 upload -p 0B2-3l2kfOp7ZQ054RFJ1THpRbXM style2door*.apk
