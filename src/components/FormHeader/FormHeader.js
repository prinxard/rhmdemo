
import { KgirsLogo } from "../Images/Images";

export const FormHeader = ({ text }) => (
  <div className="flex justify-center">
    <div>
      <KgirsLogo />
      <h1 className="text-lg font-serif"> {text} </h1>
    </div>
  </div>

);
