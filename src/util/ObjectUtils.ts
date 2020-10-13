export type KeyValue = { [valueKey: string]: any };

export class ObjectUtils {

  static isUndefined(obj: any) {
    return obj === void 0;
  }

  static isDefined(obj?: any): boolean {
    return !ObjectUtils.isUndefined(obj);
  }

  static isNotSet(obj?: any): boolean {
    return ObjectUtils.isUndefined(obj) || obj === null;
  }

  static isSet(obj?: any): boolean {
    return !this.isNotSet(obj);
  }
}
