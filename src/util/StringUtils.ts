import {ObjectUtils} from "./ObjectUtils";

export class StringUtils {

  static toString(x: any): string {
    return ObjectUtils.isDefined(x) ? typeof x === 'string' ? `"${x}"` : x.toString() : x
  }
}
