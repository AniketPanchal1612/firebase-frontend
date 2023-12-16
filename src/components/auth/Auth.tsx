import React, { useState } from "react";
import { AuthForm } from "./../../model/Form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,

} from "firebase/auth";
import { auth, db } from "./../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppDispatch } from "./../../hook/storeHook";
import { login } from "./../../slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../home/Logo";

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [authType, setAuthType] = useState<"login" | "sign-up">("login");
  const [formData, setFormData] = useState<AuthForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});



  const validateForm = () => {
    const errors: Record<string, string> = {};
    for (const key in formData) {
      if (!formData[key as keyof AuthForm]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      errors['confirmPassword'] = 'Passwords do not match';
    } 
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (data: AuthForm) => {
    setLoading(true);
    if (validateForm()) {
      const { email, password } = data;
    if (authType === "sign-up") {
      try {
        // setLoading(true);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(user);

        //email. password
        await setDoc(doc(db, "users", user.uid), { email });
        if (user && user.email)
          dispatch(
            login({
              email: user.email,
              id: user.uid,
              photoUrl: user.photoURL || null,
            })
          );

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        //   console.log(error);
        const errCode = error.code;
        setErrorMsg(errCode);
      }
    } else {
        //sign in
        // setErrorMsg(null)
        const {user} = await signInWithEmailAndPassword(auth,email,password)
        setLoading(false)
        if(user && user.email){
            dispatch(
                login({
                    email:user.email,
                    id:user.uid,
                    photoUrl: user.photoURL ||null
                })
            )
        }
        navigate('/form')

    }
    } else {
      setLoading(false);
      
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof AuthForm
  ) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
    // Clear the error message when the user starts typing
    setFormErrors({
      ...formErrors,
      [fieldName]: "",
    });
  };

  const handleAuthType = () => {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "sign-up" : "login"
    );
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center pt-12 pb-12">
        <Logo/>
        {errorMsg && <p>{errorMsg}</p>}
        <form
          action=""
          className="flex flex-col mt-10 bg-white p-4 pl-1 pr-1 lg:pl-8 lg:pr-8 rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(formData); // Passing formData to handleFormSubmit
          }}
        >
          
          <h2 className="text-2xl mb-3 font-bold">
            {authType === "login" ? "Login" : "Sign Up"}
          </h2>
          <div className="flex flex-col gap-4 text-blue-800 font-bold ">
            <input
              type="email"
              id=""
              className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
            {formErrors.email && (
            <p className="text-red-500 mt-1">{formErrors.email}</p>
          )}

            <input
              type="password"
              id=""
              className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
            {formErrors.password && (
            <p className="text-red-500 mt-1">{formErrors.password}</p>
          )}

            <input
              type="password"
              id=""
              className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e, "confirmPassword")}
            />
            {formErrors.confirmPassword && (
            <p className="text-red-500 mt-1">{formErrors.confirmPassword}</p>
          )}

            <div className="flex justify-center">
              <button
                className="bg-blue-800 text-white p-2  rounded-full"
                disabled={loading}
              >
                Sign {authType === "login" ? "in" : "up"} with Email
              </button>
            </div>
          </div>
          <div className="text-sm mt-3 text-blue-500 cursor-pointer">
            {authType === "login" ? (
              <span>
                Don&apos;t have an account yet?{" "}
                <span className="underline" onClick={handleAuthType}>
                  Sign up
                </span>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <span className="underline" onClick={handleAuthType}>
                  Sign in
                </span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
