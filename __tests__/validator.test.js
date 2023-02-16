import Validator from '../src/util/Validator.js';

describe('숫자가 자연수가 맞는지 확인하는 기능', () => {
  test.each(['1004', '1', '+3000'])('%s은(는) true를 반환한다', (input) => {
    expect(Validator.isPositiveInteger(input)).toBeTruthy();
  });

  test.each([
    ['0x123', '십진법이 아님'],
    ['1000.4', 'floating point임'],
    ['-1000', '음수임'],
    ['타우린', '문자열임'],
    ['0', '자연수가 아님'],
  ])('%s은(는) false를 반환한다(%s)', (input) => {
    expect(Validator.isPositiveInteger(input)).toBeFalsy();
  });

  test('Number 자료형 범위 초과', () => {
    expect(Validator.isNumberInRange(1000, Number.MAX_SAFE_INTEGER)('123456789011121314')).toBeFalsy();
  });

  test('Number 자료형 범위 안', () => {
    expect(Validator.isNumberInRange(1000, Number.MAX_SAFE_INTEGER)('1234')).toBeTruthy();
  });
});

describe('배열 길이 확인', () => {
  test('[1, 2, 3, 4, 5, 6]의 길이가 6인지 확인', () => {
    const answer = Validator.isArrayLengthEqual(
      [1, 2, 3, 4, 5, 6],
      6,
    );

    expect(answer).toBeTruthy();
  });

  test('[1, 2, 3, 4, 5, 6]의 길이가 7인지 확인', () => {
    const answer = Validator.isArrayLengthEqual(
      [1, 2, 3, 4, 5, 6],
      7,
    );

    expect(answer).toBeFalsy();
  });
});

describe('숫자가 특정 범위 안인지 확인', () => {
  test.each([1, 45])('1~45 범위 안인 경우', (value) => {
    expect(Validator.isNumberInRange(1, 46)(value)).toBeTruthy();
  });

  test.each([0, 46])('1~45 범위 밖인 경우', (value) => {
    expect(Validator.isNumberInRange(1, 46)(value)).toBeFalsy();
  });
});

describe('배열에서 중복된 요소 있는지 확인', () => {
  test('[1, 1, 2, 3, 4, 5]인 경우', () => {
    expect(Validator.hasDuplication([1, 1, 2, 3, 4, 5])).toBeTruthy();
  });

  test('[1, 6, 2, 3, 4, 5]인 경우', () => {
    expect(Validator.hasDuplication([1, 6, 2, 3, 4, 5])).toBeFalsy();
  });
});

describe('문자열 동일성 테스트', () => {
  test('x', () => {
    expect(Validator.isSame('x', 'y')).toBeFalsy();
  });

  test('y', () => {
    expect(Validator.isSame('y', 'y')).toBeTruthy();
  });

  test('Y', () => {
    expect(Validator.isSame('Y', 'y')).toBeTruthy();
  });
});
