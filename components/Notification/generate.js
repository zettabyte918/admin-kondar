import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { classNames } from "../../utils";

const generateBackgroundColor = (type) => {
  switch (type) {
    case "DANGER":
      return "text-red-400";
    case "SUCCESS":
      return "text-green-400";
    default:
      return;
  }
};

export const generateIcon = (type) => {
  switch (type) {
    case "DANGER":
      return (
        <ExclamationIcon
          className={classNames(generateBackgroundColor(type), "h-6 w-6")}
          aria-hidden="true"
        />
      );
    case "SUCCESS":
      return (
        <CheckCircleIcon
          className={classNames(generateBackgroundColor(type), "h-6 w-6")}
          aria-hidden="true"
        />
      );
    default:
      return;
  }
};
