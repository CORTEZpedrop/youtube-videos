import Image from "next/image";
import { Paper } from "@mui/material";
import { BackgroundImage } from "./components/template/backgroundImage";
import AccessButton from "./components/atoms/accessButton/accessButton";
import Typer from "./components/atoms/typer/Typer";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BackgroundImage>
        <Paper
          sx={{
            backgroundColor: "white",
            padding: 4,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            positioning: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            gap: 4,
            borderRadius: "14px",
          }}
        >
          <div style={{ fontSize: 20, margin: 20 }}>
            <Image src="/globo.svg" alt="login" width={250} height={100} />
          </div>
          <div
            style={{
              fontSize: 30,
              margin: 20,
              fontFamily: "product-sans, sans-serif",
            }}
          >
            <Typer />
            {/* Bem-vindo à TV 3.0 */}
          </div>
          <AccessButton />
        </Paper>
      </BackgroundImage>
    </div>
  );
}
