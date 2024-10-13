import React from "react";
import "./AppBar.css";
import Image from "next/image";
import { Divider } from "@mui/material";

const Appbar = () => {
  return (
    <>
      <header className="appbar">
        <div className="appbar-background">
          <div className="left-content">
            <div className="logos">
              <Image
                src="/logo.svg"
                alt="Desafio técnico"
                width={150}
                height={75}
                style={{ marginLeft: "55px" }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Appbar;
