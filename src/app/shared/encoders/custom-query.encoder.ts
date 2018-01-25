import { HttpParameterCodec } from '@angular/common/http';

function standardEncoding(v: string): string {
  return encodeURIComponent(v)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/gi, '$')
    .replace(/%2C/gi, ',')
    .replace(/%3B/gi, ';')
    .replace(/%2B/gi, '+')
    .replace(/%3D/gi, '=')
    .replace(/%3F/gi, '?')
    .replace(/%2F/gi, '/');
}

export class CustomQueryEncoder implements HttpParameterCodec {
  encodeKey(k: string): string {
    k = standardEncoding(k);
    return k.replace(/\+/gi, '%2B');
  }
  encodeValue(v: string): string {
    v = standardEncoding(v);
    return v.replace(/\+/gi, '%2B');
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string) {
    return decodeURIComponent(v);
  }
}
