import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setApp } from "../redux/slices/appSlice";

export default function LoadingScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const LOADING_TIMEOUT = 10 * 1000;

  useEffect(() => {
    // Loading screen timeout
    const timeout = setTimeout(() => {
      dispatch(setApp({ loadingState: false }));
    }, LOADING_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="h-[100vh] flex justify-center items-center dark:bg-zinc-900 dark:text-white">
      <div className="text-center">
        <img src="/icon.svg" className="mx-auto mb-4" alt="Todo Daily" />
        <span>{t("initializing")}</span>
      </div>
    </div>
  );
}
