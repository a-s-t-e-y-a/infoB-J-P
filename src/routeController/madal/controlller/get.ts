import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../../../utlis/responseError";
import { CustomError } from "../../../utlis/throwError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import karykarta from "src/routeController/karyakarta/route";

const prisma = new PrismaClient();
export async function getMundalById(req: Request, res: Response) {
  try {
    const mundalId = parseInt(req.params.id);

    const mundal = await prisma.mundal.findMany({
      where: {
        id: mundalId,
      },
      include: {
        Sector: true,
      },
    });
    const mundalKarykarta = await prisma.karykarta.findMany({
      where: {
        mundalId: Number(mundalId),
        role: {
          in: [
            "adhyaksha",
            "upaadhyaksha",
            "mahamantri",
            "mantri",
            "koshadhyaksha",
            "karyakarta",
          ],
        },
      },
    });
    const customOrder = [
      "adhyaksha",
      "koshadhyaksha",
      "upaadhyaksha",
      "mantri",
      "mahamantri",
      "karyakarta",
    ];

    // Create a new sorted array based on custom order
    const sortedData = customOrder.flatMap((role) =>
      mundalKarykarta.filter((item) => item.role === role)
    );
    responseSuccess(res, {
      status: 200,
      message: "Mundal retrieved successfully",
      data: {
        "mundal": mundal,
        "karyakarta": sortedData,
      },
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

export async function getAllMundals(req: Request, res: Response) {
  try {
    const name = req.query.name as string | undefined;

    const mundals = await prisma.mundal.findMany({
      where: name ? { name } : undefined, // Use conditional object for filtering
      include: {
        karyakarta: true,
        Sector: {
          include: {
            poolingBooth: true,
          },
        },
      },
    });
    responseSuccess(res, {
      status: 200,
      message: "All Mundals retrieved successfully",
      data: mundals,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

interface MundalDataItem {
  id: number;
  name: string;
  karyakarta: Array<{
    id: number;
    name: string;
    address: string;
    mobileNumber: string;
    dob: string;
    religion: string;
    gender: string;
    previousParty: string;
    mundalId: number;
    sectorId: number | null;
    poolingBoothid: number | null;
    role: string;
  }>;
  Sector: any | null; // Define the correct type for Sector if possible
  karyakartaCount?: number; // Added property for karyakarta count
  sectorCount?: number; // Added property for sector count
}

interface MundalData {
  message: string;
  data: MundalDataItem[];
}
