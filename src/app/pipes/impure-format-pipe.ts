import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impureFormat',
  standalone: true,
  pure: false
})
export class ImpureFormatPipe implements PipeTransform {
  transform(value: any, type: string = 'default'): string {
    console.log(`🐌 ImpureFormatPipe çalıştı:`, value, type);
    
    if (value == null) return 'Değer yok';
    
    const stringValue = value.toString();
    
    switch (type) {
      case 'uppercase': return stringValue.toUpperCase();
      case 'lowercase': return stringValue.toLowerCase();
      case 'currency': return `$${stringValue}`;
      case 'percentage': return `${stringValue}%`;
      case 'reverse': return stringValue.split('').reverse().join('');
      default: return `Impure: ${stringValue}`;
    }
  }
}