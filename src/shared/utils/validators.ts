enum ValidatorTypes {
  REQUIRE = "REQUIRE",
  MINLENGTH = "MINLENGTH",
  MAXLENGTH = "MAXLENGTH",
  MIN = "MIN",
  MAX = "MAX",
  EMAIL = "EMAIL",
}

export type ValidationData = { type: ValidatorTypes; val?: any };

export const VALIDATOR_REQUIRE = () => ({ type: ValidatorTypes.REQUIRE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: ValidatorTypes.MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: ValidatorTypes.MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number) => ({
  type: ValidatorTypes.MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: number) => ({
  type: ValidatorTypes.MAX,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({ type: ValidatorTypes.EMAIL });

export const validate = (value: any, validators: ValidationData[]) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === ValidatorTypes.REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === ValidatorTypes.MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === ValidatorTypes.MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === ValidatorTypes.MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === ValidatorTypes.MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === ValidatorTypes.EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
