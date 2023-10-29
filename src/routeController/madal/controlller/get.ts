import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../../../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import karykarta from "src/routeController/karyakarta/route";
import { CustomError } from "../../../utlis/throwError";
import { Workbook } from "excel4node";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";

const prisma = new PrismaClient();
export async function getMundalById(req: Request, res: Response) {
  try {
    const mundalId = parseInt(req.params.id);
    const download = Boolean(req.query.download) as Boolean;
    const type = req.query.type as string;
    const mundal = await prisma.mundal.findUnique({
      where: {
        id: mundalId,
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
    if (Boolean(download) == true) {
      if (type == "Excel") {
        const wb = new Workbook();
        const ws = wb.addWorksheet("Mundals Data");
        const style = wb.createStyle({
          font: {
            color: "#000000",
            size: 12,
            bold: true,
          },
          alignment: { horizontal: "center", vertical: "center" },
        });

        // Create Excel headers
        const headers = [
          "Id",
          "Mundal Name",
          "address",
          "Mobile Number",
          "Date of birth",
          "Religion",
          "Gender",
          "Previous Party",
          "Role",
        ];

        headers.forEach((header, index) => {
          ws.cell(1, index + 1).string(header).style(style);
        });

        let count = 2;

        // Export data to Excel
        sortedData.forEach((info) => {
          ws.cell(count, 1).number(info.id).style(style);
          ws.cell(count, 2).string(mundal.name).style(style);
          ws.cell(count, 3).string(info.address).style(style);
          ws.cell(count, 4).string(info.mobileNumber).style(style);
          ws.cell(count, 5).string(info.dob).style(style);
          ws.cell(count, 6).string(info.religion).style(style);
          ws.cell(count, 7).string(info.gender).style(style);
          ws.cell(count, 8).string(info.previousParty).style(style);
          ws.cell(count, 9).string(info.role).style(style);

          count++;
        });

        // Send the Excel file as a response
        wb.write("mundals.xlsx", res);
      } else if (type == "pdf") {
        const doc = new jsPDF("l");

        // Create PDF headers
        const headers = [
          "Id",
          "Mundal Name",
          "address",
          "Mobile Number",
          "Date of birth",
          "Religion",
          "Gender",
          "Previous Party",
          "Role",
        ];

        const body = sortedData.map((info) => [
          info.id,
          mundal.name,
          info.address,
          info.mobileNumber,
          info.dob,
          info.religion,
          info.gender,
          info.previousParty,
          info.role,
        ]);

        // Create PDF
        autoTable(doc, {
          head: [headers],
          body: body,
        });

        const pdfFileName = "mundals.pdf";
        doc.save(pdfFileName);
        const pdfFile = fs.readFileSync(pdfFileName);

        // Send the PDF file as a response
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'inline; filename="mundals.pdf"');
        res.send(pdfFile);
      }
    } else {
      // Send JSON response with Mundals data
      responseSuccess(res, {
        status: 200,
        message: "Mundal retrieved successfully",
        data: {
          "mundal": mundal,
          "karyakarta": sortedData,
        },
      });
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

export async function getAllMundals(req: Request, res: Response) {
  try {
    const name = req.query.name as string | undefined;
    const download = Boolean(req.query.download) as Boolean;
    const type = req.query.type as string;
    const mundals = await prisma.mundal.findMany({
      where: name ? { name } : undefined, // Use conditional object for filtering
      include:{
        karyakarta:true,
        Sector:true
      }
    });

    if (Boolean(download) == true) {
      if (type == "Excel") {
        const wb = new Workbook();
        const ws = wb.addWorksheet("Mundals Data");
        const style = wb.createStyle({
          font: {
            color: "#000000",
            size: 12,
            bold: true,
          },
          alignment: { horizontal: "center", vertical: "center" },
        });

        // Create Excel headers
        const headers = [
          "Id",
          "Mundal Name",
        ];

        headers.forEach((header, index) => {
          ws.cell(1, index + 1).string(header).style(style);
        });

        let count = 2;

        // Export data to Excel
        mundals.forEach((info) => {
          ws.cell(count, 1).number(info.id).style(style);
          ws.cell(count, 2).string(info.name).style(style);
          count++;
        });

        // Send the Excel file as a response
        wb.write("mundals.xlsx", res);
      } else if (type == "pdf") {
        const doc = new jsPDF("l");

        // Create PDF headers
        const headers = [
          "Id",
          "Mundal Name",
        ];

        const body = mundals.map((info) => [
          info.id,
          info.name,
        ]);

        // Create PDF
        autoTable(doc, {
          head: [headers],
          body: body,
        });

        const pdfFileName = "mundals.pdf";
        doc.save(pdfFileName);
        const pdfFile = fs.readFileSync(pdfFileName);

        // Send the PDF file as a response
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'inline; filename="mundals.pdf"');
        res.send(pdfFile);
      }
    } else {
      // Send JSON response with Mundals data
      responseSuccess(res, {
        status: 200,
        message: "All Mundals retrieved successfully",
        data: mundals,
      });
    }
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
