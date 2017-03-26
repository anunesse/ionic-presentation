exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  specs: ['./protractor/*_spec.js'],

  capabilities: {
    platformName: 'android',
    platformVersion: '7.1.1',
    deviceName: 'AndroidNougat',
    browserName: "",
    autoWebview: true,
    //CHANGE THIS TO YOUR ABSOLUTE PATH
    app: '${PROJECT_ABSOLUTE_PATH}/platforms/android/build/outputs/apk/android-debug.apk'
  },
  // configuring wd in onPrepare
  // wdBridge helps to bridge wd driver with other selenium clients
  // See https://github.com/sebv/wd-bridge/blob/master/README.md
  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
  }
};
