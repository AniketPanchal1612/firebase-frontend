import React, { useState } from "react";
import Logo from "../home/Logo";
import { useAppDispatch } from "../../hook/storeHook";
import { auth, db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storeUserDetails } from "../../slice/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [grade, setGrade] = useState<number | undefined>();
  const [mobileNo, setMobileNo] = useState<number | undefined>();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof initialFormData, string>>
  >({});

  const userDetailsRef = collection(db, "userDetails");
  const initialFormData = {
    firstName: "",
    lastName: "",
    schoolName: "",
    grade: undefined,
    mobileNo: undefined,
  };
  const validateForm = () => {
    const errors: Partial<Record<keyof typeof initialFormData, string>> = {};

    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!mobileNo) {
      errors.mobileNo = "Mobile Number is required";
    }
    if (!schoolName.trim()) {
      errors.schoolName = "School Name is required";
    }
    if (!grade) {
      errors.grade = "Grade is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const registerHandler = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        await addDoc(userDetailsRef, {
          firstName: firstName,
          lastName: lastName,
          schoolName: schoolName,
          grade: grade,
          mobileNo: mobileNo,
          userId: auth?.currentUser?.uid,
        });
        // console.log(firstName,lastName,mobileNo)

        // Clear the form fields after successful registration
        dispatch(
          storeUserDetails({
            firstName,
            lastName,
            schoolName,
            grade,
            mobileNo,
            // userId:auth?.currentUser?.uid

            // Include the user ID
          })
        );
        navigate("/dashboard");
        setFirstName("");
        setLastName("");
        setSchoolName("");
        setMobileNo(undefined);
        setGrade(undefined);
      } catch (error) {
        console.error("Error registering user:", error);
        // Handle error if required
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center justify-center pt-12 pb-12">
        <div>
          <Logo />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerHandler();
            }}
            className="flex flex-col mt-10 bg-white p-4 pl-8 pr-8 rounded-lg"
          >
            <div className="">
              <div className="first__name flex flex-col gap-4 text-blue-800 font-bold ">
                <h3 className="text-3xl mb-5">Fill Detais</h3>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name=""
                  id=""
                  placeholder="First Name"
                  className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 mt-1">{formErrors.firstName}</p>
                )}

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name=""
                  id=""
                  placeholder="Last Name"
                  className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 mt-1">{formErrors.lastName}</p>
                )}

                <input
                  type="number"
                  value={mobileNo ?? ""}
                  onChange={(e) => setMobileNo(parseInt(e.target.value))}
                  name=""
                  id=""
                  placeholder="Enter Mobile Number"
                  className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
                />
                {formErrors.mobileNo && (
                  <p className="text-red-500 mt-1">{formErrors.mobileNo}</p>
                )}

                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  name=""
                  id=""
                  placeholder="Enter School Name"
                  className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
                />
                {formErrors.schoolName && (
                  <p className="text-red-500 mt-1">{formErrors.schoolName}</p>
                )}

                <input
                  type="number"
                  value={grade ?? ""}
                  onChange={(e) => setGrade(parseInt(e.target.value))}
                  name=""
                  id=""
                  placeholder="Enter Grade"
                  className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
                />
                {formErrors.grade && (
                  <p className="text-red-500 mt-1">{formErrors.grade}</p>
                )}

                <div className="flex justify-center">
                  <button className="bg-blue-800 text-white p-2 w-1/2 rounded-full">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
