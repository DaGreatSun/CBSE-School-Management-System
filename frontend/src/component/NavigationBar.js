import React, { useState } from "react";
import { Button, Drawer, Menu, Navbar, Accordion } from "react-daisyui";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";
import logo from "../images/logo-scholly.png";
import { Link } from "react-router-dom";
import { routes } from "../constant/routeConstant";

function NavigationBar() {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible(!visible);
  }

  function renderRoutes() {
    return routes.map((route, idx) => {
      if (route.collapse) {
        return (
          <Accordion key={idx} icon="arrow">
            <Accordion.Title className="flex items-center text-gray-600">
              <div>{route.icon}</div>

              <div>{route.name}</div>
            </Accordion.Title>

            <Accordion.Content>
              {route.paths.map((sub, i) => (
                <Link to={sub.path} key={i}>
                  <div
                    className="flex items-center p-[12px] pl-[30px] rounded-lg hover:bg-gray-200 duration-200 text-gray-600"
                    onClick={toggleVisible}
                  >
                    <div>{sub.icon}</div>

                    <div>{sub.name}</div>
                  </div>
                </Link>
              ))}
            </Accordion.Content>
          </Accordion>
        );
      } else {
        return (
          <Link
            to={route.path}
            key={idx}
            onClick={toggleVisible}
            className="flex items-center p-[1rem] rounded-lg hover:bg-gray-200 duration-200 text-gray-600"
          >
            <div>{route.icon}</div>

            <div>{route.name}</div>
          </Link>
        );
      }
    });
  }

  return (
    <>
      <Navbar className="shadow-lg bg-white">
        <div className="navbar-start">
          <Drawer
            className="z-[1]"
            open={visible}
            onClickOverlay={toggleVisible}
            side={
              <Menu className="p-4 w-80 h-full bg-white text-base-content">
                <div className="flex items-center justify-center pr-6 py-2">
                  <img src={logo} className="w-9 h-9 mr-3" alt="logo" />
                  <div className="text-2xl font-semibold">Scholly</div>
                </div>
                {renderRoutes()}
              </Menu>
            }
          >
            <Button shape="square" color="ghost" onClick={toggleVisible}>
              <TbMenu2 size={23} />
            </Button>
          </Drawer>
        </div>
        <div className="navbar-center">
          <Link to={"/"} className="flex items-center">
            <img src={logo} className="w-10 h-10 mr-2" alt="logo" />
            <div className="text-2xl font-semibold">Scholly</div>
          </Link>
        </div>
        <div className="navbar-end">
          <Button shape="square" color="ghost" className="mr-3">
            <RiLogoutBoxRLine size={25} />
          </Button>
        </div>
      </Navbar>
    </>
  );
}

export default NavigationBar;
