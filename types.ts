/**
 * Locale data for NSH's `Intl`, as registerable by an app.
 *
 * The schema mirrors what NSH's built-in locale tables hold (camelCase here,
 * the Rust structs there); the proposed `registerLocale(tag, data)` in
 * longbridge/nsh#1237 takes objects of this shape. Unknown keys reject on
 * registration, so keep this file and the locale modules in sync with the
 * runtime's accepted vocabulary.
 */

/** A locale's number formatting. */
export interface NumbersData {
  /** The decimal separator (`٫`). */
  decimal: string;
  /** The group separator (`٬`). */
  group: string;
  /** Integer digits before the first group separator, less three: 1 (`1,234`) or 2 (Spanish `12.345`). */
  minGrouping: number;
  /** Groups of two after the first three (`12,34,567`, India). */
  indian: boolean;
  /** Before a negative number (`-`, `−`, `‎−`). */
  minus: string;
  /** Before a positive number a sign asks to show. */
  plus: string;
  /** After the number (`12%`, `12 %`). */
  percent: string;
  /** `NaN`, in the locale's words where it has them. */
  nan: string;
  /** Between a scientific mantissa and its exponent (`E`, Persian `×10^`). */
  exponential: string;
  /** The locale's ten digits, `0` first — omit for Latin. */
  digits?: string;
  /** The currency before the number (`$1.00`) or after (`1,00 €`). */
  currencyBefore: boolean;
  /** Between the currency and the number (``, ` `). */
  currencySpace: string;
  /** Compact notation: the power of ten of each unit and its suffix. */
  compactShort: Record<number, string>;
  /** `compactDisplay: "long"` (the short ones where there are none). */
  compactLong: Record<number, string>;
}

/** A field of a date pattern. */
export type DateField = "year" | "month" | "day";

/** A locale's date and time formatting. */
export interface DatesData {
  /** 12-hour times by default (24-hour unless stated). */
  hour12: boolean;
  /** 24-hour times pad the hour (`09:05`). */
  padHour24: boolean;
  /** The morning day period. */
  am: string;
  /** The afternoon/evening day period. */
  pm: string;
  /** The day period before the time (`오후 3:04`). */
  periodFirst: boolean;
  /** Between the time and the day period after it. */
  periodSpace: string;
  /** After an hour formatted alone in 24-hour time (`15 Uhr`, `15時`). */
  hourSuffix: string;
  /** A numeric date: the fields in order and what follows each. */
  numeric: [DateField, string][];
  /** `dateStyle: "short"` writes a two-digit year. */
  shortYear2Digit: boolean;
  /** A date with a month name: the fields and what follows each — `null`: written numerically. */
  text: [DateField, string][] | null;
  /** With `month: "long"`, where the pattern differs — `null`: same as `text`. */
  textLong: [DateField, string][] | null;
  /** The weekday's place: before the date (and what follows it) or after. */
  weekdayFirst: boolean;
  /** Between the weekday and the date. */
  weekdaySep: string;
  /** Between the date and the time. */
  dateTimeSep: string;
  /** Before `fractionalSecond` digits. */
  fractionDecimal: string;
  /** Chinese, Japanese and Korean: months are numbers with a unit. */
  cjk: boolean;
  /** Month and weekday names — `null`: months as numbers, English weekdays. */
  names: NamesData | null;
}

/** Month and weekday names (weekdays from Sunday). */
export interface NamesData {
  months: [string, string, string, string, string, string, string, string, string, string, string, string];
  monthsShort: [string, string, string, string, string, string, string, string, string, string, string, string];
  weekdays: [string, string, string, string, string, string, string];
  weekdaysShort: [string, string, string, string, string, string, string];
}

/** A locale: its data, and what its regions override. */
export interface LocaleData {
  numbers: NumbersData;
  dates: DatesData;
  /** Region overrides by region code (`"AF"`), merged over the language's data. */
  regions?: Partial<Record<string, DeepPartial<LocaleData>>>;
}

/** All optional, for region overrides. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[] | null ? T[K] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};
