export type DateFormatOption = 'short' | 'medium' | 'long' | 'full' | 'time' | 'datetime';

interface FormatDateOptions {
  locale?: string;
  format?: DateFormatOption;
  timeZone?: string;
}

export const formatDate = (
  date: string | Date | number,
  options: FormatDateOptions = {}
): string => {
  const {
    locale = 'en-US',
    format = 'medium',
    timeZone = 'Asia/Tashkent',
  } = options;

  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  let formatOptions: Intl.DateTimeFormatOptions;

  switch (format) {
    case 'short':
      formatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
      break;
    case 'medium':
      formatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      break;
    case 'long':
      formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      break;
    case 'full':
      formatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      break;
    case 'time':
      formatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      break;
    case 'datetime':
      formatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      break;
    default:
      formatOptions = {};
  }

  return new Intl.DateTimeFormat(locale, {
    ...formatOptions,
    timeZone,
  }).format(d);
};
