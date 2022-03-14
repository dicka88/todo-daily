import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { fetchUpdateUser, selectUser } from "../../redux/slices/authSlice";

import Appbar from "../../components/ui/Appbar";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";

export default function Profile() {
  const { t } = useTranslation();
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

    dispatch(
      fetchUpdateUser({
        uid: user.uid,
        data: form,
      })
    );
  };

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <div className="container max-w-screen-sm py-8 px-12">
          <div className="rounded-full mx-auto h-[100px] w-[100px] bg-graySoft border border-graySoft overflow-hidden">
            <img
              src={user.avatarURL}
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
              <label className="mb-2 font-semibold">{t("name")}</label>
              <Input
                name="displayName"
                placeholder={t("namePlaceholder")}
                value={form.displayName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 font-semibold">{t("password")}</label>
              <Input
                name="password"
                placeholder={t("passwordPlaceholder")}
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
            <PrimaryButton type="submit" className="mr-4 py-1 px-4">
              {t("save")}
            </PrimaryButton>
            <Link to="/app">
              <SecondaryButton>{t("cancel")}</SecondaryButton>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
