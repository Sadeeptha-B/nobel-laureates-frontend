import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Input, { InputType } from "../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../shared/utils/validators";

const Login = () => {
  const auth = useContext(AuthContext);

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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <Input
                element={InputType.Input}
                id="email"
                label="Your Email"
                type="email"
                placeholder="name@company.com"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Invalid email"
              />
              <Input
                element={InputType.Input}
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Invalid password"
              />

              <ReCAPTCHA
                className="flex justify-center items-center"
                sitekey={import.meta.env.VITE_APP_SITE_KEY as string}
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={auth.login}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
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
