# nsh-i18n

Locale data for [NSH](https://nsh.dev)'s `Intl` — one module per language, as a
separate, optional package, so an app pays only for the locales it targets and
the runtime grows with none of them.

**Status: seed.** This repo implements the design agreed in
[longbridge/nsh#1237](https://github.com/longbridge/nsh/issues/1237) and the
direction of [longbridge/nsh#1163](https://github.com/longbridge/nsh/pull/1163)'s
review: locale data lives at the application layer. It starts under a
contributor account; the intent is to move it to the NSH organization
(`longbridge/nsh-i18n`) once the maintainers are happy with it.

## Shape

```ts
import { fa } from "nsh-i18n/locales/fa";
// once NSH ships registerLocale (nsh#1237):
// registerLocale("fa", fa);
```

- `types.ts` — the `LocaleData` schema: number symbols (including an optional
  ten-digit string for non-Latin numbering), grouping, currency placement,
  compact units, date patterns, day periods, and month/weekday names; a
  `regions` map for region overrides (`fa-AF`'s Dari months), mirroring the
  built-in tables' structure
- `locales/fa.ts` — Persian (`fa`, `fa-IR`), with the `fa-AF` (Dari) override;
  every value verified against CLDR 46 and a full-ICU engine's output
  (`۱٬۲۳۴٬۵۶۷٫۸۹۱`, `۲۰۲۶/۱۰/۱۶`, `۱۶ اکتبر ۲۰۲۶`, `۱۵:۰۴`, `ب.ظ.`)
- `tests/` — schema invariants and the CLDR-verified values, run with `bun test`

## Conventions

- Visible Unicode written literally; invisible marks escaped (`\u200e` LRM,
  `\u00a0` NBSP, `\u200c` ZWNJ), as NSH's own tables write them
- Gregorian calendar only, matching `Intl.DateTimeFormat` today
- A locale module is a plain JSON-able object: tree-shakable, serveable as an
  `nsh/*`-style module, and validatable on registration

## Adding a language

One file per language under `locales/`, exporting a `LocaleData`; extend
`tests/locales.test.ts` with its CLDR-verified values. Keep invisible marks
escaped and cite the CLDR files the data came from.

## License

MIT
