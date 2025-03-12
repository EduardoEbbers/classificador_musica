describe('Jasmine Test Environment', () => {
    //it('is working', () => expect(true).toBe(false));

    it('test numeric value', () => expect(12).toBeGreaterThan(10));
    it('test string value', () => expect('London').toMatch('^Lon'));
});