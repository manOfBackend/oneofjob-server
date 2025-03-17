import { Logger } from '@nestjs/common';

const logger = new Logger('DateUtils');

/**
 * 한국 날짜 형식(YYYY.MM.DD, YYYY-MM-DD, YYYY/MM/DD)을 Date 객체로 변환
 * @param dateStr 날짜 문자열 (예: "2025.03.17")
 * @returns 파싱된 Date 객체 또는 파싱 실패시 undefined
 */
export function parseKoreanDate(dateStr: string): Date | undefined {
  try {
    if (!dateStr) return undefined;

    if (dateStr.includes('.')) {
      // YYYY.MM.DD 형식
      const [year, month, day] = dateStr.split('.').map((n) => parseInt(n, 10));
      if (year && month && day) {
        return new Date(year, month - 1, day);
      }
    } else if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-').map((n) => parseInt(n, 10));
      if (year && month && day) {
        return new Date(year, month - 1, day);
      }
    } else if (dateStr.includes('/')) {
      const [year, month, day] = dateStr.split('/').map((n) => parseInt(n, 10));
      if (year && month && day) {
        return new Date(year, month - 1, day);
      }
    }

    return undefined;
  } catch (error) {
    logger.warn(
      `날짜 파싱 오류 (${dateStr}): ${error instanceof Error ? error.message : String(error)}`,
    );
    return undefined;
  }
}

/**
 * 기간 문자열에서 시작일과 종료일을 추출
 * @param periodText 기간을 나타내는 문자열 (예: "2025.03.05 ~ 2025.03.17")
 * @returns 시작일과 종료일 객체
 */
export function parseDateRange(periodText: string): { startDate?: Date; endDate?: Date } {
  if (!periodText) return { startDate: undefined, endDate: undefined };

  try {
    // ~ 또는 - 를 기준으로 분리
    const separator = periodText.includes('~') ? '~' : periodText.includes('-') ? '-' : null;

    if (!separator) {
      // 구분자가 없는 경우 단일 날짜로 간주
      const singleDate = parseKoreanDate(periodText.trim());
      return { startDate: singleDate, endDate: singleDate };
    }

    const [startStr, endStr] = periodText.split(separator).map((s) => s.trim());

    return {
      startDate: startStr ? parseKoreanDate(startStr) : undefined,
      endDate: endStr ? parseKoreanDate(endStr) : undefined,
    };
  } catch (error) {
    logger.warn(
      `기간 파싱 오류 (${periodText}): ${error instanceof Error ? error.message : String(error)}`,
    );
    return { startDate: undefined, endDate: undefined };
  }
}
