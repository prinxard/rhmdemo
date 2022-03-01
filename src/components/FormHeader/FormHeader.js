
import { KgirsLogo, RHMLogo } from "../Images/Images";

export const FormHeader = ({ text }) => (
  <>
    <div className="flex justify-between">

      <KgirsLogo />

      <RHMLogo />
    </div>
      <h1 className="text-lg font-serif text-center"> {text} </h1>
  </>

);
