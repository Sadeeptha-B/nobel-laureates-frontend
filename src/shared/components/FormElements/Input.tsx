import { ChangeEvent, useReducer, useEffect } from "react";
import { ValidationData, validate } from "../../utils/validators";

type InputProps = {
  element: InputType;
  id: string;
  type: string;
  label: string;
  placeholder: string;
  rows?: number;
  validators: ValidationData[];
  errorText: string;
};

type ACTIONTYPE = {
  type: "CHANGE" | "TOUCH";
  value: string;
  validators: ValidationData[];
};

export enum InputType {
  Input,
  Textarea,
}

const initialState = { value: "", isValid: false, isTouched: false };

const inputReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators!),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
      value: inputState.value,
      validators: props.validators,
    });
  };

  const element =
    props.element == InputType.Input ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={touchHandler}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={touchHandler}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    );

  return (
    <div>
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
