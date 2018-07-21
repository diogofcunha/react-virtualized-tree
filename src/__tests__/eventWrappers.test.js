import {wrapKeyDownEvent, KEY_CODES} from '../eventWrappers';

describe('eventWrappers', () => {
  describe('wrapKeyDownEvent', () => {
    it('should call the handler for the binded keys with the correct params', () => {
      const bindedKeys = {
        [KEY_CODES.Tab]: null,
        [KEY_CODES.Alt]: null,
        [KEY_CODES.Backspace]: null,
      };
      const params = [5, 2, 8];

      Object.keys(bindedKeys).forEach(keyCode => {
        const handler = jest.fn();
        wrapKeyDownEvent(bindedKeys)(handler)({keyCode}, ...params);

        expect(handler).toHaveBeenCalledWith(...params);
      });
    });

    it('should not call the handler for keys that are not binded', () => {
      const bindedKeys = {
        [KEY_CODES.Tab]: null,
      };
      const params = [5, 2, 8];
      const handler = jest.fn();
      wrapKeyDownEvent(bindedKeys)(handler)({keyCode: KEY_CODES.Backspace}, ...params);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
