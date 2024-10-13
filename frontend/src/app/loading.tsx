"use client";
import Image from "next/image";
import { styled } from "@mui/material/styles";

const CustomScreen = styled("div")(({ theme }) => ({
  "&:before": {
    zIndex: "1000",
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60vh",
  },
  "&:after": {
    zIndex: "1000",
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "20vh",
  },
  "& .logo": {
    margin: 0,
    position: "absolute",
    top: "20%",
    left: "50%",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  },
  "& .image": {
    magin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  },
  "& #loader-wrapper": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "1000",
    backgroundColor: theme.palette.background.paper,
  },
  "& #loader": {
    display: "block",
    position: "relative",
    left: "50%",
    top: "50%",
    width: "150px",
    height: "150px",
    margin: "-75px 0 0 -75px",
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: theme.palette.primary.main,
    WebkitAnimation: "spin 2s linear infinite",
    animation: "spin 2s linear infinite",
  },
  "& #loader:before": {
    content: '""',
    position: "absolute",
    top: "5px",
    left: "5px",
    right: "5px",
    bottom: "5px",
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: theme.palette.secondary.main,
    WebkitAnimation: "spin 3s linear infinite",
    animation: "spin 3s linear infinite",
  },
  "& #loader:after": {
    position: "absolute",
    content: '""',
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: theme.palette.text.disabled,
    WebkitAnimation: "spin 1.5s linear infinite",
    animation: "spin 1.5s linear infinite",
  },
  "@-webkit-keyframes spin": {
    "0%": {
      WebkitTransform: "rotate(0deg)",
      msTransform: "rotate(0deg)",
      transform: "rotate(0deg)",
    },
    "100%": {
      WebkitTransform: "rotate(360deg)",
      msTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
    },
  },
  "@keyframes spin": {
    "0%": {
      WebkitTransform: "rotate(0deg)",
      msTransform: "rotate(0deg)",
      transform: "rotate(0deg)",
    },
    "100%": {
      WebkitTransform: "rotate(360deg)",
      msTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
    },
  },
}));

export default function LoadingScreen() {
  return (
    <CustomScreen>
      <div id="loader-wrapper">
        <div className={"logo"}>
          <Image
            src="/logo.svg"
            alt={"Logo Globo"}
            width={200}
            height={70}
            priority
          />
        </div>
        <div className={"image"}>
          <Image
            src="/globo.svg"
            alt={"Rede globo"}
            width={80}
            height={80}
            priority
          />
        </div>
        <div id="loader"></div>
      </div>
    </CustomScreen>
  );
}
