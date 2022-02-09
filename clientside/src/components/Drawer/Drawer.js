import React from "react";
import Button from "../UI/Buttons";
import Icon from "../UI/Icons";
import "./Drawer.scss";

const Drawer = () => {
  return (
    <aside className="default-drawer">
      <div className="hidden-settings"></div>
      <nav>
        <Button.DrawerNavButton label="Home" icon={<Icon.Home size="22" />} />
        <Button.DrawerNavButton
          label="Summary"
          icon={<Icon.Calculate size="22" />}
        />
        <Button.DrawerNavButton
          label="Settings"
          icon={<Icon.Settings size="22" />}
        />
      </nav>
    </aside>
  );
};

export default Drawer;
