import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure as configureDataQa } from '@testing-library/react';

/**
 * February 14th 2023 00:00
 */
const NOW = new Date('2023-02-14T00:00:00.000Z').getTime();

export const requestSpy = vi.fn();

beforeAll(() => {
  vi.hoisted(() => {
    vi.useFakeTimers({ toFake: ['Date'], now: new Date('2023-02-14T00:00:00.000Z') });
  });

  expect.extend(matchers);
  expect.addSnapshotSerializer({
    test: (val) => val && typeof val === 'string' && val.includes(':r'),
    print: (val: unknown): string => {
      let str = val as string;
      str = str.replaceAll(/:r.:*/gm, ':ro:');
      return `"${str}"`;
    }
  });

  configureDataQa({ testIdAttribute: 'data-qa' });

  // Mock random number generator
  vi.spyOn(global.Math, 'random').mockReturnValue(0.123_456_789);

  // Lock Date.now to given date
  vi.spyOn(Date, 'now').mockImplementation(() => NOW);

  // Mock createRange function for PopperJS in MaterialUI
  window.document.createRange = () => ({
    setStart: () => undefined,
    setEnd: () => undefined,
    // @ts-expect-error Only these properties are needed
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});
