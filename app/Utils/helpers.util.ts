import { isArray, isUndefined, pickBy } from "lodash";

export class Helpers {
  public static generateRandomString(
    length: number,
    options: {
      start?: string;
      includeUpperCase: boolean;
      includeLowerCase: boolean;
      includeNumbers: boolean;
      includeSpecialCharacters?: boolean;
    }
  ) {
    let text = options.start || "";
    const remainingLength = length - text.length;

    if (remainingLength <= 0) {
      // Original String is already
      // greater than required length
      return text;
    }

    let dictionary = "";

    if (options.includeLowerCase) {
      dictionary += "abcdefghijklmnopqrstuvwxyz";
    }

    if (options.includeUpperCase) {
      dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (options.includeNumbers) {
      dictionary += "1234567890";
    }

    if (options.includeSpecialCharacters) {
      dictionary += "!@#$%^&*()";
    }

    for (let i = 1; i < length; i++) {
      text += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return text;
  }

  public static generateRandomNumber(max: number, min?: number) {
    if (!min) {
      min = 0;
    }
    const range = max - min;

    if (range <= 0) {
      throw "PARAMS_ERROR";
    }

    return min + Math.floor(Math.random() * range);
  }

  public static sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * Ideally, the parameter type any should be replaced by typeof T but the compiler (TS 2.4) can"t understand this syntax.
   * @param enumRef
   * @returns {T[]}
   */
  public static iterateEnum<T>(enumRef: any): T[] {
    return Object.keys(enumRef).map((key) => enumRef[key]);
  }

  public static checkInEnum<T>(enumRef: any, value: T): boolean {
    return (
      Object.keys(enumRef)
        .filter((k) => isNaN(Number(k))) // Removing reverse mapping in numeric enums.
        .filter((k) => enumRef[k] === value).length > 0
    );
  }

  public static removeUndefinedKeys(object: any) {
    Object.keys(object).forEach((key) => {
      if (isUndefined(object[key])) {
        delete object[key];
      }
    });
  }

  public static replaceUndefinedWithNull(object: any) {
    if (isUndefined(object)) {
      return null;
    }
    return object;
  }

  public static replaceZeroOneWithTrueFalse(object: any) {
    if (!object || object === 0) {
      return false;
    }
    return true;
  }

  public static slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/[\s-]+/g, "_");
  }

  public static unslugify(input: string): string {
    if (input === "") {
      return input;
    }
    return Helpers.titleCase(input.replace(new RegExp("_", "g"), " "));
  }

  public static titleCase(input: string): string {
    if (!input) {
      return input;
    }
    return input
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
  }

  public static isJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static isEmail(input?: string) {
    const regex =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    const pattern = new RegExp(regex);
    return pattern.test(<string>input);
  }

  public static stringContainsSubstrings(
    subject: string,
    needles: string[],
    ignoreCase: boolean = true
  ): boolean {
    let finalSubject = subject;
    let finalNeedles = needles;

    if (ignoreCase) {
      finalSubject = subject.toLowerCase();
    }

    if (ignoreCase) {
      finalNeedles = finalNeedles.map((n) => n.toLowerCase());
    }

    for (const needle of finalNeedles) {
      if (finalSubject.includes(needle)) {
        return true;
      }
    }

    return false;
  }

  public static isTruthyValue(value: any) {
    return value !== null && value !== undefined && value !== "";
  }

  public static getKeyForS3Obj(key: string): string {
    return "x-amz-meta-" + key;
  }

  public static sanitizeObject = (data: any) => {
    return pickBy(data, (v: any) =>
      isArray(v) ? !!v.length : v !== null && v !== undefined && v !== ""
    );
  };

  public static IsJSONString = (str: string): boolean => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  public static getDates(from: string, to: string) {
    const cFrom = new Date(from);
    const cTo = new Date(to);

    let daysArr = [new Date(cFrom)];
    let tempDate = cFrom;

    while (tempDate < cTo) {
      tempDate.setUTCDate(tempDate.getUTCDate() + 1);
      daysArr.push(new Date(tempDate));
    }
    daysArr.pop();
    return daysArr;
  }
}
