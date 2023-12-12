import toast from "react-hot-toast";
import { PiWarningCircleFill } from "react-icons/pi";

export function toastValidationError(errors) {
  const errorsArr = Object.entries(errors);

  if (errorsArr.length > 0) {
    for (let i = 0; i < errorsArr.length; i++) {
      const err = errorsArr[i];
      console.error(err[0] + ": " + err[1]);

      toast((t) => (
        <div className="flex items-center">
          <PiWarningCircleFill className="text-warning mr-3" size={25} />
          <div className="w-60">
            <span className="font-semibold">{err[0] + ": "}</span>
            <span>{err[1]}</span>
          </div>
        </div>
      ));
    }
  }
}
