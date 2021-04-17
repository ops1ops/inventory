import { checkBoundsOverlap } from '../canMoveItem';

describe('Validator: canMoveItem', () => {
  describe('checkBoundsOverlap', () => {
    const boundsTable = [
      [[3, 8], [5, 7], true],
      [[3, 8], [3, 8], true],
      [[3, 8], [3, 5], true],
      [[3, 8], [1, 2], false],
      [[3, 8], [8, 10], true],
      [[3, 8], [2, 3], true],
      [[3, 8], [2, 3], true],
      [[3, 8], [15, 20], false],
      [[3, 8], [1, 9], true],
    ];

    it.each(boundsTable)('should check overlap for %j and %j', (firstBounds, secondBounds, hasOverlap) => {
      expect(checkBoundsOverlap(firstBounds, secondBounds)).toBe(hasOverlap);
    });
  });
});