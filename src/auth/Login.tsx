import { AuthContext } from "../shared/context/auth-context";
import { FormEvent, useCallback, useContext, useReducer } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Input, { InputType } from "../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/utils/validators";

const initialFormState = {
  inputs: {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  },
  isValid: false,
};

type ACTIONTYPE = {
  type: "INPUT_CHANGE";
  inputId: string;
  isValid: boolean;
  value: string;
};

const formReducer = (state: typeof initialFormState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId == action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid &&
            state.inputs[inputId as keyof typeof state.inputs].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Login = () => {
  const auth = useContext(AuthContext);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // Use callback to prevent infinite loops
  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Nobel Laureates
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <Input
                element={InputType.Input}
                id="email"
                label="Your Email"
                type="email"
                placeholder="name@company.com"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Invalid email"
                onInput={inputHandler}
              />
              <Input
                element={InputType.Input}
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Invalid password"
                onInput={inputHandler}
              />

              <ReCAPTCHA
                className="flex justify-center items-center"
                sitekey={import.meta.env.VITE_APP_SITE_KEY as string}
              />
              <button
                type="submit"
                className="w-full text-white disabled:bg-blue-400 dark:disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                // onClick={auth.login}
                disabled={!formState.isValid}
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? &nbsp;
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
