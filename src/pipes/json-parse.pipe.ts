import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class JsonParsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value)
    console.log(metadata)

    try {
    } catch (error) {}
  }
}
