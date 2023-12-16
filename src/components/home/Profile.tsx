import React from "react";
import { useAppDispatch, useAppSelector } from "../../hook/storeHook";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { logout } from "../../slice/AuthSlice";
import Logo from "./Logo";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector((state) => state.user.userDetails);
  console.log(userDetail);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };
  return (
    <div>
      <Logo />
      <div className="bg-white rounded-2xl mt-6">
        <div className="flex flex-col p-3 gap-3 ">
          <h1>
            {userDetail?.firstName} {userDetail?.lastName}
          </h1>
          <hr className="w-full" />
          <h3>{userDetail?.grade}th Grade</h3>
          <hr className="w-full" />
          <p>{userDetail?.schoolName}</p>
          <hr className="w-full" />
          <Link to="/" className="text-blue-600" onClick={handleLogout}>
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
