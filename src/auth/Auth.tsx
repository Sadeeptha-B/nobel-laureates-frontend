import { AuthContext } from "../shared/context/auth-context";
import {
  FormEvent,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Input, { InputType } from "../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/utils/validators";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorNotification from "../shared/components/UIElements/ErrorNotification";
import { login, signup } from "../shared/api/auth-api";

// Types
type FormInputs = { [key: string]: { value: string; isValid: boolean } };

type FormState = {
  inputs: FormInputs;
  isValid: boolean;
};

type ACTIONTYPE =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      isValid: boolean;
      value: string;
    }
  | { type: "SET_DATA"; inputs: FormInputs; isValid: boolean };

// Initial state starts from login
const initialFormState: FormState = {
  inputs: {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  },
  isValid: false,
};

const formReducer = (state: FormState, action: ACTIONTYPE): FormState => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId == action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid && state.inputs[inputId as keyof FormInputs].isValid;
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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

const Auth = () => {
  const auth = useContext(AuthContext);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  // To handle switching between login and signup modes
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authPending, setAuthPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // Use callback to prevent infinite loops
  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        inputId: id,
        value: value,
        isValid: isValid,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputs: FormInputs, isFormValid: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputs,
        isValid: isFormValid,
      });
    },
    []
  );

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setAuthPending(true);
      setErrorMessage(undefined);
      let data = null;
      if (isLoginMode) {
        data = await login({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        });
      } else {
        data = await signup({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        });
      }

      auth.login(data.userId, data.email, data.token);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong, Please try again."
      );
    } finally {
      setAuthPending(false);
    }
  };

  const switchModeHandler = (e: FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      // Moving to signup mode
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    } else {
      // Moving to login mode
      setFormData(
        { email: formState.inputs.email, password: formState.inputs.password },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {authPending && <LoadingSpinner asOverlay />}
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
              {isLoginMode ? "Sign in to your account" : "Create a new account"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              {!isLoginMode && (
                <Input
                  element={InputType.Input}
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Solomon"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name."
                  onInput={inputHandler}
                />
              )}
              <Input
                element={InputType.Input}
                id="email"
                label="Your Email"
                type="email"
                placeholder="name@company.com"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email"
                onInput={inputHandler}
              />
              <Input
                element={InputType.Input}
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                validators={
                  isLoginMode ? [VALIDATOR_REQUIRE()] : [VALIDATOR_MINLENGTH(6)]
                }
                errorText={
                  isLoginMode
                    ? "Please enter your password"
                    : "Password must be at least 6 characters long"
                }
                onInput={inputHandler}
              />

              <ReCAPTCHA
                className="flex justify-center items-center"
                sitekey={import.meta.env.VITE_APP_SITE_KEY as string}
              />
              <button
                type="submit"
                className="w-full text-white disabled:bg-blue-400 dark:disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={!formState.isValid}
              >
                {isLoginMode ? "Sign In" : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isLoginMode
                  ? "Don't have an account yet?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={switchModeHandler}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {isLoginMode ? "Sign up" : "Sign in"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* TODO: Fix positioning and animation */}
      {errorMessage && <ErrorNotification message={errorMessage} />}
    </section>
  );
};

export default Auth;
