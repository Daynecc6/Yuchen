import React from "react";
import { Element, scroller } from "react-scroll";
import Landing from "./Landing";
import AboutApp from "./AboutApp";
import AboutUs from "./AboutUs";

const MainContent = () => {
  return (
    <>
      <Landing />
      <AboutApp />
      <AboutUs />
    </>
  );
};

export default MainContent;
