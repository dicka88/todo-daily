import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../../components/Appbar";
import { selectUser } from "../../redux/slices/authSlice";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // console.log(user);

  const [form, setForm] = useState({
    displayName: user.displayName,
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch();
  };

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <div className="container max-w-screen-sm py-8 px-12">
          <div className="rounded-full mx-auto h-[100px] w-[100px] bg-graySoft border border-graySoft overflow-hidden">
            <img
              src={user.photoURL}
              alt=""
              className="object-fit w-full h-full"
            />
          </div>
          <div className="text-center my-4">
            <h1 className="font-bold text-lg text-[1.7rem]">
              {user.displayName}
            </h1>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label className="mb-2 font-semibold">Name</label>
              <Input
                name="displayName"
                placeholder="Enter your name"
                value={form.displayName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 font-semibold">Password</label>
              <Input
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
            <PrimaryButton type="submit" className="mr-4">
              Save
            </PrimaryButton>
            <Link to="/app">
              <SecondaryButton>Cancel</SecondaryButton>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
