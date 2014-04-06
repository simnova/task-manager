xcopy /s /y dist\*.* cordova\www
del cordova\www\cordova.js
pushd cordova
cordova emulate android
popd