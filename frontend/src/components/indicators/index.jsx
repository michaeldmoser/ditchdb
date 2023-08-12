import cx from "@/utils/cx";
import Orion from "./orion";

function Indicator({ className, children }) {
  const classes = cx(className, "indicator");
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export { Indicator, Orion };
