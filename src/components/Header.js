import React from "react";

const Header = () => {
  return (
    /*you have to use "CLASSNAME" below instead of "CLASS" as class is a class object in object oriented programming
        /in JS , so thats the diff between writing a simple html and jsx i.e in html we can simply write "div class" whereas
        in jsx we need to write "div className" */
    <div className=" ui fixed menu">
      <div className="ui container center">
        <h2> Contact Manager</h2>
      </div>
    </div>
  );
};

export default Header;
