import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";
import { CustomError } from "../../../utlis/throwError";
import { Workbook } from "excel4node";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";
const prisma = new PrismaClient();

export async function getPoolingBoothById(req: Request, res: Response) {
  try {
    const poolingBoothId = parseInt(req.params.id);

    const poolingBooth = await prisma.poolingBooth.findUnique({
      where: {
        id: poolingBoothId,
      },
      include: {
        village: true,
        karykarta: true,
      },
    });

    if (!poolingBooth) {
      throw new CustomError("Pooling booth doesnit found", 404, "Bad request");
    }

    responseSuccess(res, {
      status: 200,
      message: "PoolingBooth retrieved successfully",
      data: poolingBooth,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

// Get all PoolingBooths with optional filters for sectorId and mundalId
export async function getAllPoolingBooths(req: Request, res: Response) {
  try {
    const { villageId, mundalId } = req.query;
    const download = Boolean(req.query.download) as Boolean;
    const type = req.query.type as string;
    const filters: Record<string, any> = {}; // Define the types for sectorId and mundalId

    if (villageId) {
      filters.villageId = parseInt(villageId.toString());
    }

    if (mundalId) {
      filters.mundalId = parseInt(mundalId.toString());
    }

    const poolingBooths = await prisma.poolingBooth.findMany({
      where: filters,
      include: {
        village: true,
        karykarta: true,
        mundal: true,
      },
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
          "Booth  Name",
          "Village Name",
          "Mundal Name",
          "karykarta Name",
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
        poolingBooths.forEach((karykarta) => {
          karykarta.karykarta.map((info) => {
            ws.cell(count, 1).number(karykarta.id).style(style);
            ws.cell(count, 2).string(karykarta.name).style(style);
            ws.cell(count, 3).string(karykarta.village.name).style(style);
            ws.cell(count, 4).string(karykarta.mundal.name).style(style);
            ws.cell(count, 5).string(info.name).style(style);
            ws.cell(count, 6).string(info.address).style(style);
            ws.cell(count, 7).string(info.mobileNumber).style(style);
            ws.cell(count, 8).string(info.dob).style(style);
            ws.cell(count, 9).string(info.religion).style(style);
            ws.cell(count, 10).string(info.gender).style(style);
            ws.cell(count, 11).string(info.previousParty).style(style);
            ws.cell(count, 12).string(info.role).style(style);
          });

          count++;
        });

        // Send the Excel file as a response
        wb.write("mundals.xlsx", res);
      } else if (type == "pdf") {
        const doc = new jsPDF("l");

        // Create PDF headers
        const headers = [
          "Id",
          "Booth  Name",
          "Village Name",
          "Mundal Name",
          "karykarta Name",
          "address",
          "Mobile Number",
          "Date of birth",
          "Religion",
          "Gender",
          "Previous Party",
          "Role",
        ];

        const body = poolingBooths.flatMap((karykarta) =>
          karykarta.karykarta.map((info) => [
            karykarta.id,
            karykarta.name,
            karykarta.village.name,
            karykarta.mundal.name,
            info.name,
            info.address,
            info.mobileNumber,
            info.dob,
            info.religion,
            info.gender,
            info.previousParty,
            info.role,
          ])
        );

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
        message: "PoolingBooths retrieved successfully",
        data: poolingBooths,
      });
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
