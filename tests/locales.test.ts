import { expect, test } from "bun:test";
import { fa } from "../locales/fa";

const locale = (tag: string) => {
  const [lang, region] = tag.split("-");
  const base = lang === "fa" ? fa : undefined;
  if (!base) throw new Error(`no locale ${lang}`);
  const override = base.regions?.[region];
  if (!override) return base;
  return {
    numbers: { ...base.numbers, ...override.numbers },
    dates: { ...base.dates, ...override.dates, names: override.dates?.names ?? base.dates.names },
  };
};

test("fa matches CLDR and a full-ICU engine's output", () => {
  const { numbers, dates } = locale("fa-IR");
  expect(numbers.decimal).toBe("٫");
  expect(numbers.group).toBe("٬");
  expect(numbers.percent).toBe("٪");
  expect(numbers.minus).toBe("\u200e\u2212");
  expect(numbers.plus).toBe("\u200e+");
  expect(numbers.nan).toBe("ناعدد");
  expect(numbers.exponential).toBe("×10^");
  expect(numbers.digits).toBe("۰۱۲۳۴۵۶۷۸۹");
  expect(numbers.compactShort[6]).toBe("\u00a0میلیون");
  expect(numbers.compactLong[12]).toBe(" هزارمیلیارد");
  expect(dates.numeric).toEqual([
    ["year", "/"],
    ["month", "/"],
    ["day", ""],
  ]);
  expect(dates.am).toBe("ق.ظ.");
  expect(dates.pm).toBe("ب.ظ.");
  expect(dates.dateTimeSep).toBe("\u060c ");
  expect(dates.fractionDecimal).toBe("٫");
  // The zero-width non-joiner CLDR writes in سه‌شنبه.
  expect(dates.names?.weekdays[2]).toBe("سه\u200cشنبه");
});

test("fa-AF overrides the months and the currency space", () => {
  const faIR = locale("fa-IR");
  const faAF = locale("fa-AF");
  expect(faAF.dates.names?.months[9]).toBe("اکتوبر");
  expect(faAF.dates.names?.monthsShort[6]).toBe("جول");
  expect(faIR.dates.names?.months[9]).toBe("اکتبر");
  expect(faAF.numbers.currencySpace).toBe("\u00a0");
  expect(faIR.numbers.currencySpace).toBe("");
});

test("the schema invariants hold", () => {
  for (const tag of ["fa", "fa-AF"]) {
    const { numbers, dates } = locale(tag);
    expect(numbers.digits).toHaveLength(10);
    expect(new Set(numbers.digits).size).toBe(10);
    for (const key of ["decimal", "group", "minus", "percent", "nan", "exponential"]) {
      expect(numbers[key as keyof typeof numbers]).toBeTruthy();
    }
    expect(Object.keys(numbers.compactShort).sort((a, b) => Number(a) - Number(b))).toEqual(["12", "3", "6", "9"].sort((a, b) => Number(a) - Number(b)));
    expect(dates.names?.months).toHaveLength(12);
    expect(dates.names?.monthsShort).toHaveLength(12);
    expect(dates.names?.weekdays).toHaveLength(7);
    expect(dates.names?.weekdaysShort).toHaveLength(7);
    expect(dates.numeric.length).toBeLessThanOrEqual(3);
    for (const [field] of dates.numeric) expect(["year", "month", "day"]).toContain(field);
  }
});
