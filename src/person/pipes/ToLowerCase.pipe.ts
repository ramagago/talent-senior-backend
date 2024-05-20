import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ToLowerCase implements PipeTransform {
  transform(sortOrder: any): 'asc' | 'desc' {
    if (!sortOrder) {
      throw new BadRequestException('Invalid sortOrder format');
    }
    return sortOrder.toLowerCase();
  }
}
