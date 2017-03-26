# Ionic & hybrid frameworks

### Client ionic (clickmeme)
#### Requirements
* Node : 6.9.2 (npm)
* Android : Android SDK, $ANDROID_HOME
* IOS : XCode, ios-deploy
* npm install -g cordova ionic
* For e2e testing: npm install -g wd appium protractor

#### Install
* cd clickmeme/
* npm install
* ionic platform add android (or ios)
* ionic state restore
* ionic run android (or ios)

#### Livecoding
...

#### E2e testing
* In a separate terminal, run appium: `appium`
* Create a emulator or plug a physical device.
* Update `protractor-config.js` with path of application and device name.
* Run `protractor protractor-config.js`.

### Client web (ionic-web)
[https://clickmeme-2f0a0.firebaseapp.com/]