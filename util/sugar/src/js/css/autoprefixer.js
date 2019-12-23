import { prefix } from 'inline-style-prefixer';

export default function autoprefixer(style) {
  return prefix(style);
}
