export interface User {
    email: string;
    id: string;
    photoUrl: string | null;
  }




// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Logo from "../home/Logo";
// // import OTPInput, { ResendOTP } from "otp-input-react";
// // import OtpInput from "react-otp-input";

// // const LoginPage = () => {
// //   const [otp, setOtp] = useState<number | string>();
// //   const [ph, setPh] = useState<number | string>("");
// //   return (
// //     <div className=" h-screen flex flex-col items-center justify-center pt-12 pb-12">
// //       <div>
// //         <Logo />
// //         <form
// //           action=""
// //           className="flex flex-col mt-10 bg-gray-600 p-4 pl-8 pr-8 rounded-lg"
// //         >
// //           <div className="">
// //             <div className="first__name flex flex-col gap-4 text-blue-800 font-bold ">
// //               <h3 className="text-3xl mb-5">Login Now</h3>

// //               <input
// //                 type="number"
// //                 name=""
// //                 id=""
// //                 placeholder="Enter Mobile Number"
// //                 className="placeholder:text-blue-400 p-2 border rounded-lg border-gray-400 w-72 bg-gray-100"
// //               />

// //               {/* <OtpInput
// //                 value={otp}
// //                 onChange={setOtp}
// //                 numInputs={4}
// //                 renderSeparator={<span>-</span>}
// //                 renderInput={(props) => <input {...props} />}
// //               /> */}
// //               <OTPInput
// //                 autoFocus
// //                 value={otp}
// //                 onChange={setOtp}
// //                 OTPLength={4}
// //                 otpType="number"
// //                 disabled={false}
// //                 secure
// //               />

// //               <div className="flex justify-center">
// //                 <button className="bg-blue-800 text-white p-2 w-1/2 rounded-full">
// //                   Verify OTP
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// // {
// //   /* <Link to='/' className="text-sm font-normal">Don't have an account? <span className="underline"> Register</span> </Link> */
// // }


// import React, { useState } from 'react';
// import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
// import { CgSpinner } from 'react-icons/cg';
// import OtpInput from 'otp-input-react';
// import 'react-phone-input-2/lib/style.css';
// import { auth } from './../../config/firebase';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { toast, Toaster } from 'react-hot-toast';
// import PhoneInput from 'react-phone-input-2';

// const App: React.FC = () => {
//   const [otp, setOtp] = useState<string>('');
//   const [ph, setPh] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showOTP, setShowOTP] = useState<boolean>(false);
//   const [user, setUser] = useState<any>(null); // Replace 'any' with appropriate user type

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//         size: 'invisible',
//         callback: (response) => {
//           onSignup();
//         },
//         'expired-callback': () => {},
//       }, auth);
//     }
//   }

//   function onSignup() {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = '+' + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success('OTP sent successfully!');
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (res) => {
//         console.log(res);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }

//   return (
//     <section className="bg-emerald-500 flex items-center justify-center h-screen">
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>
//         {user ? (
//           <h2 className="text-center text-white font-medium text-2xl">
//             👍Login Success
//           </h2>
//         ) : (
//           <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//             <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
//               Welcome to <br /> CODE A PROGRAM
//             </h1>
//             {showOTP ? (
//               <>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                   <BsFillShieldLockFill size={30} />
//                 </div>
//                 <label
//                   htmlFor="otp"
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Enter your OTP
//                 </label>
//                 <OtpInput
//                   value={otp}
//                   onChange={setOtp}
//                   OTPLength={6}
//                   otpType="number"
//                   disabled={false}
//                   autoFocus
//                   className="opt-container"
//                 ></OtpInput>
//                 <button
//                   onClick={onOTPVerify}
//                   className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                 >
//                   {loading && (
//                     <CgSpinner size={20} className="mt-1 animate-spin" />
//                   )}
//                   <span>Verify OTP</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                   <BsTelephoneFill size={30} />
//                 </div>
//                 <label
//                   htmlFor=""
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Verify your phone number
//                 </label>
//                 <PhoneInput country={'in'} value={ph} onChange={setPh} />
//                 <button
//                   onClick={onSignup}
//                   className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                 >
//                   {loading && (
//                     <CgSpinner size={20} className="mt-1 animate-spin" />
//                   )}
//                   <span>Send code via SMS</span>
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default App;
