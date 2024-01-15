import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 本の詳細情報を取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/book/")[1]);
    await main();
    const book = await prisma.book.findFirst({
      where: { id },
    });
    return NextResponse.json({ message: "Success", book }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

// 本の編集用API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/book/")[1]);
    const { title, body } = await req.json();
    await main();
    const book = await prisma.book.update({
      data: { title, body },
      where: { id },
    });
    return NextResponse.json({ message: "Success", book }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

// 本の削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/book/")[1]);
    await main();
    const book = await prisma.book.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Success", book }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
