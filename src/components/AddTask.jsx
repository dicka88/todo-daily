import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AddTask = ({ setAddState }) => {
  const { t } = useTranslation();
  return (
    <div className="my-4">
      <button onClick={() => setAddState(true)}>
        <div className="pr-4 text-primary flex items-center">
          <BsFillPlusCircleFill size={22} className="mr-6" />
          <span className="text-primary">{t("addTask")}</span>
        </div>
      </button>
    </div>
  );
};

export default AddTask;
