import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const upsertUser = async (req, res) => {
  try {
    const { id, email, name } = req.body;

    const user = await prisma.user.upsert({
      where: { id },
      update: { name, email },
      create: { id, name, email },
    });

    return res.json({ success: true, message: user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
