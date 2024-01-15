import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました");
  }
};

// 本を全件取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const books = await prisma.book.findMany();
    return NextResponse.json({ message: "Success", books }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

// 本を投稿するAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, body } = await req.json();
    await main();
    const book = await prisma.book.create({
      data: { title, body },
    });
    return NextResponse.json({ message: "Success", book }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
