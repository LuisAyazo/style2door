#!/bin/bash

date=$(date +"%d-%m-%y_%H:%M")
export ANDROID_HOME=$ANDROID_HOME

# Generacion del keystore - 1 sola vez
#keytool -genkey -v -keystore style2door.keystore -alias style2door -keyalg RSA -keysize 2048 -validity 10000

# firmar un apk
#jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore style2door.keystore platforms/android/build/outputs/apk/android-release.apk style2door -storepass beabby

rm -rf style2door*.apk

# ADD platforms
# ionic cordova platform add ios
# ionic cordova platform add android


# Creando archivo gradle.properties para android
# Archivo ant.properties example
#
# storeFile=style2Door.keystore
# storePassword=beabby
# keyAlias=style2Door
# keyPassword=beabby
#
# echo "cdvReleaseSigningPropertiesFile=${ANDROID_HOME}/ant.properties" > platforms/android/gradle.properties
# Construir
# ionic cordova build android --release


# Si no utilizamos gradle realizamos el proceso con un json y al build le colocamos --buildConfig file.json
# El archivo de gradle.properties no debe existir
# Construir
#ionic cordova build --buildConfig=properties.json android --release
#ionic cordova build --buildConfig=properties.json android --minifyjs --minifycss --optimizejs --release
ionic cordova build --buildConfig=properties.json android --minifyjs --minifycss --optimizejs --release --prod --aot
# eliminar mensaje jarsigner: unable to sign jar: java.util.zip.ZipException: invalid entry compressed size (expected 23707 but got 24246 bytes)
zip -d platforms/android/build/outputs/apk/release/android-release.apk META-INF/\*

# Firmamos el APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore style2door.keystore platforms/android/build/outputs/apk/release/android-release.apk style2door -storepass beabby

# facebook key hash
keytool -storepasswd -storepass beabby -exportcert -alias style2door -keystore style2door.keystore | openssl sha1 -binary | openssl base64

#obtener huella digital
#keytool -list -v -keystore /home/luis/Android/Sdk/my-release-key.keystore


# Verificar
zipalign -v 4 platforms/android/build/outputs/apk/release/android-release.apk style2door-${date}.apk


# SUBIR APK A GOOGLE DRIVE
/home/luis/importante/gdrive-linux-x64 upload -p 0B2-3l2kfOp7ZQ054RFJ1THpRbXM style2door*.apk
