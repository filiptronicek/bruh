const isAvailable = require('../bin/src/availible');

test('tries to resolve google.com', () => {
    expect(isAvailable('google.com')).toBe(undefined);
});