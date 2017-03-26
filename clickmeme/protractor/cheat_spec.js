describe('Cheat', function () {
    var EC = protractor.ExpectedConditions;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('Cheat test', function () {
        for (var i = 0; i < 10; i++) {
            browser.ignoreSynchronization = true;
            var winPic = element(by.css('.winPic'));
            browser.wait(EC.presenceOf(winPic), 10000);
            expect(winPic.isPresent()).toBeTruthy();
            winPic.click();
        }
    });
});
