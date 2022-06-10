import { TipCalculator } from "../../widgets";
import logo from "../../images/logo.svg";

import cn from "./styles.module.sass";

export const App = () => {
  return (
    <div className={cn.container} style={{ backgroundImage: `url(${logo})` }}>
      <TipCalculator />
    </div>
  );
};
