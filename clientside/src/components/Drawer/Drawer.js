import { useState } from "react";
import Button from "../UI/Buttons";
import Icon from "../UI/Icons";
import "./Drawer.scss";

const Drawer = () => {
  const [toggle, settoggle] = useState(false);

  return (
    <aside className={`default-drawer ${toggle && "active"}`}>
      <div className="hidden-settings"></div>
      <nav>
        <Button.DrawerNavButton label="Home" icon={<Icon.Home size="22" />} />
        <Button.DrawerNavButton
          label="Summary"
          icon={<Icon.Calculate size="22" />}
        />
        <Button.DrawerNavButton
          onClick={() => settoggle(!toggle)}
          label="Settings"
          icon={<Icon.Settings size="22" />}
        />
      </nav>
    </aside>
  );
};

export default Drawer;
