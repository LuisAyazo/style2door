#!/bin/bash
# created by Luis Ayazo
# Export androidHome
export ANDROID_HOME=$ANDROID_HOME

# ADD platforms
ionic cordova platform add ios
ionic cordova platform add android

# Creando archivo gradle.properties para android
echo "cdvReleaseSigningPropertiesFile=${ANDROID_HOME}/ant.properties" > platforms/android/gradle.properties

# Construir
ionic cordova build android --prod --release

# Verificar
zipalign -v 4 platforms/android/build/outputs/apk/android-release.apk style2door.apk
