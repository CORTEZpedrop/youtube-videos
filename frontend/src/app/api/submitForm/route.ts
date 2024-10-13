import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/authOptions";
import axios from "axios";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request, res: NextApiResponse) {
  const { equipamento, serial, modelo, fabricante, tipo_sensor } =
    await req.json();

  //   const session = await getServerSession(authOption);
  //   const authToken = session?.accessToken;
  //   const user = session?.user?.name;

  try {
    if (!equipamento) {
      throw new Error("sem equipamento");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}create/equipments`,
      {
        equipamento,
        serial,
        modelo,
        fabricante,
        // user,
        tipo_sensor,
      },
      {
        headers: {
          //   Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status == 200) {
      return new Response("Cadastrado com sucesso!", {
        status: 200,
      });
    } else {
      return new Response("No good bro", {
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);

    return new Response("Failed", {
      status: 400,
    });
  }
}

export async function GET(request: Request) {
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
