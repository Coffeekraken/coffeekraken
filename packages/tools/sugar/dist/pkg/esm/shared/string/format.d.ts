import { format } from 'fecha';

type tFormat = 'isoDate' | 'isoDateTime' | 'isoTime' | 'integer' | 'number' | 'alphanum' | 'hex' | 'hexa' | 'creditCard';
declare function format(string: string, format: tFormat): string;
export default format;
