import { Locale } from "date-fns";

interface LocaleMapInterface extends Locale {
  formats: string[];
  format: string;
}

export interface LocaleMap {
  "en-GB": LocaleMapInterface;
  "en-ZA": LocaleMapInterface;
  "fr-FR": LocaleMapInterface;
  es: LocaleMapInterface;
  "en-CA": LocaleMapInterface;
  "fr-CA": LocaleMapInterface;
  de: LocaleMapInterface;
  "en-US": LocaleMapInterface;
  "pl-PL": LocaleMapInterface;
}

export type SEPARATORS = ["", ".", ",", "-", "/"];
