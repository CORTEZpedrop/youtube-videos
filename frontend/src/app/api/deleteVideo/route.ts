import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOption } from "../auth/[...nextauth]/authOptions";
import axios from "axios";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request, res: NextApiResponse) {
  const { idDelete } = await req.json();

  //   const session = await getServerSession(authOption);
  //   const authToken = session?.accessToken;
  //   const user = session?.user?.name;

  try {
    if (!idDelete) {
      throw new Error("sem vídeo");
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}urls/${idDelete}`,
      {
        headers: {
          //   Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    );

    if (response.status == 200) {
      return new Response("Deletado com sucesso!", {
        status: 200,
      });
    } else {
      console.error(response);
      return new Response("Erro na operação", {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed", {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
