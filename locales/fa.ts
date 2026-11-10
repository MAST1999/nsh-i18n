import type { DeepPartial, LocaleData } from "../types";

/**
 * Persian (Iran) — `fa`, `fa-IR` — as browsers format it in the Gregorian
 * calendar: `arabext` digits (۰-۹), the separators `٫` / `٬`, percent `٪`,
 * `۱٬۲۳۴٬۵۶۷٫۸۹۱`, `۲۰۲۶/۱۰/۱۶`, `۱۶ اکتبر ۲۰۲۶`, unpadded 24-hour times.
 *
 * Every value verified against CLDR 46 (`cldr-numbers-full` / `cldr-dates-full`
 * for `fa`) and a full-ICU engine's output; see the tests. The invisible
 * marks are CLDR's: `\u200e` (LRM) keeps a sign or currency symbol on the
 * number's side, `\u00a0` (NBSP) keeps a compact unit with its number, and
 * `سه‌شنبه` holds a zero-width non-joiner (`\u200c`), as CLDR writes it.
 */
export const fa: LocaleData = {
  numbers: {
    decimal: "٫",
    group: "٬",
    minGrouping: 1,
    indian: false,
    minus: "‎−",
    plus: "‎+",
    percent: "٪",
    nan: "ناعدد",
    exponential: "×10^",
    digits: "۰۱۲۳۴۵۶۷۸۹",
    currencyBefore: true,
    currencySpace: "",
    compactShort: {
      3: " هزار",
      6: " میلیون",
      9: " میلیارد",
      12: " تریلیون",
    },
    compactLong: {
      3: " هزار",
      6: " میلیون",
      9: " میلیارد",
      12: " هزارمیلیارد",
    },
  },
  dates: {
    hour12: false,
    padHour24: false,
    am: "ق.ظ.",
    pm: "ب.ظ.",
    periodFirst: false,
    periodSpace: " ",
    hourSuffix: "",
    numeric: [
      ["year", "/"],
      ["month", "/"],
      ["day", ""],
    ],
    shortYear2Digit: false,
    text: [
      ["day", " "],
      ["month", " "],
      ["year", ""],
    ],
    textLong: null,
    weekdayFirst: true,
    weekdaySep: " ",
    dateTimeSep: "، ",
    fractionDecimal: "٫",
    cjk: false,
    names: {
      months: [
        "ژانویه",
        "فوریه",
        "مارس",
        "آوریل",
        "مه",
        "ژوئن",
        "ژوئیه",
        "اوت",
        "سپتامبر",
        "اکتبر",
        "نوامبر",
        "دسامبر",
      ],
      monthsShort: [
        "ژانویه",
        "فوریه",
        "مارس",
        "آوریل",
        "مه",
        "ژوئن",
        "ژوئیه",
        "اوت",
        "سپتامبر",
        "اکتبر",
        "نوامبر",
        "دسامبر",
      ],
      weekdays: [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه",
      ],
      weekdaysShort: [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه",
      ],
    },
  },
  regions: {
    /** Dari — `fa-AF`: its own months and a space after the currency. */
    AF: {
      numbers: {
        currencySpace: " ",
      },
      dates: {
        names: {
          months: [
            "جنوری",
            "فبروری",
            "مارچ",
            "اپریل",
            "می",
            "جون",
            "جولای",
            "اگست",
            "سپتمبر",
            "اکتوبر",
            "نومبر",
            "دسمبر",
          ],
          monthsShort: [
            "جنو",
            "فبروری",
            "مارچ",
            "اپریل",
            "می",
            "جون",
            "جول",
            "اگست",
            "سپتمبر",
            "اکتوبر",
            "نومبر",
            "دسم",
          ],
        },
      },
    } satisfies DeepPartial<LocaleData>,
  },
};

export default fa;
