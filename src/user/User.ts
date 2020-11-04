import {Gender, People} from "..";
import {UserPreferences} from "@rr0/common";

export class User extends People {

  constructor(readonly preferences: UserPreferences, gender: Gender, readonly firstName?: string, readonly lastName?: string, readonly middleName?: string) {
    super(gender, firstName, lastName, middleName)
  }
}
