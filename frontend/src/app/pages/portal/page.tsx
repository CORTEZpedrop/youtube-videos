import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import MyBreadcrumbs from "@/app/components/atoms/breadbCrumb/BreadCrumb";
import { redirect } from "next/navigation";
import DataGrid from "@/app/components/Molecules/dataGrid/dataGrid";
import AddVideo from "@/app/components/Molecules/addVideo/addVideo";

interface Video {
  id: string;
  description: string;
  updated_by: string;
  updated_at: string;
  url: string;
}

async function getProps() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}urls`
    );
    // const response = await axios.get(
    //   `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}urls`
    // );
    if (!response.ok) {
      console.log(`Erro na requisição: ${response.statusText}`);
      // redirect("/");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter dados do BFF:", error);
    return {
      props: null,
    };
  }
}

export default async function Portal() {
  const props = await getProps();
  if (!props) return <div>Carregando...</div>;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          margin: "10px",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MyBreadcrumbs
            labels={["Home", "Portal de Vídeos"]}
            links={["/", "/pages/cadastro"]}
          />
        </div>
        <Paper
          sx={{
            backgroundColor: "white",
            padding: 4,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            width: "100%",
            height: "80%",
            boxShadow: 24,
            overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari e Edge
            },
          }}
        >
          <Box sx={{ position: "relative", padding: "16px" }}>
            <Typography variant="h2">Portal de Vídeos</Typography>
            <Typography variant="h6">
              Aqui você encontra todos os vídeos adicionados
            </Typography>

            <Box sx={{ position: "absolute", top: "20px", right: "16px" }}>
              <AddVideo />
            </Box>
          </Box>
          {props && <DataGrid videos={props} />}
          <Typography>
            Não encontrou o o vídeo que procura? Adicione um novo!
          </Typography>
          <AddVideo />
        </Paper>
      </div>
    </div>
  );
}
