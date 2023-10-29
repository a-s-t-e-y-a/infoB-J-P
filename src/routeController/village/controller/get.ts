import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";
import { Authenticate } from "src/interfaces/requestInterface";
import { CustomError } from "../../../utlis/throwError";
import { Workbook } from "excel4node";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";
const prisma = new PrismaClient();

export async function getVillages(req: Authenticate, res: Response) {
  try {
    const queryParams: VillageQueryParams = req.query;
    const { download, type, sectorId, mundalId } = queryParams;

    const filters = {} as any; // Create an empty filter object

    // Add filters based on query parameters
    if (sectorId) filters.sectorId = parseInt(sectorId as string, 10);
    if (mundalId) filters.mundalId = parseInt(mundalId as string, 10);

    const villages = await prisma.village.findMany({
      where: filters, // Apply the filters to the query
      include: { sector: true, mundal: true },
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
          "Village Name",
          "Mundal Name",
          "Sector Name",
        ];

        headers.forEach((header, index) => {
          ws.cell(1, index + 1).string(header).style(style);
        });

        let count = 2;

        // Export data to Excel
        villages.forEach((info) => {
          ws.cell(count, 1).number(info.id).style(style);
          ws.cell(count, 2).string(info.name).style(style);
          ws.cell(count, 2).string(info.sector.name).style(style);
          ws.cell(count, 2).string(info.mundal.name).style(style);
          count++;
        });

        // Send the Excel file as a response
        wb.write("mundals.xlsx", res);
      } else if (type == "pdf") {
        const doc = new jsPDF("l");

        // Create PDF headers
        const headers = [
          "Id",
          "Village Name",
          "Mundal Name",
          "Sector Name",
        ];

        const body = villages.map((info) => [
          info.id,
          info.name,
          info.sector.name,
          info.mundal.name,
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
      res.status(200).json({
        data: villages,
        message: "Villages retrieved successfully",
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function getVillageById(req: Authenticate, res: Response) {
  try {
    const villageId = parseInt(req.params.id); // Assuming you're passing the village ID in the URL
    const download = Boolean(req.query.download) as Boolean;
    const type = req.query.type as string;

    const villages = await prisma.village.findMany({
      where: {
        id: villageId,
      },
      include: {
        sector: true,
        mundal: true,
      },
    });
    if (!villages) {
      throw new CustomError("Village not found", 404, "Not Found");
    }
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
          "Village Name",
          "Mundal Name",
          "Sector Name",
        ];

        headers.forEach((header, index) => {
          ws.cell(1, index + 1).string(header).style(style);
        });

        let count = 2;

        // Export data to Excel
        villages.forEach((info) => {
          ws.cell(count, 1).number(info.id).style(style);
          ws.cell(count, 2).string(info.name).style(style);
          ws.cell(count, 2).string(info.sector.name).style(style);
          ws.cell(count, 2).string(info.mundal.name).style(style);
          count++;
        });

        // Send the Excel file as a response
        wb.write("mundals.xlsx", res);
      } else if (type == "pdf") {
        const doc = new jsPDF("l");

        // Create PDF headers
        const headers = [
          "Id",
          "Village Name",
          "Mundal Name",
          "Sector Name",
        ];

        const body = villages.map((info) => [
          info.id,
          info.name,
          info.sector.name,
          info.mundal.name,
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
        data: villages,
        message: "Village retrieved successfully",
        status: 200,
      });
    }
  } catch (error) {
    errorResponse(res, error);
  }
}

interface VillageQueryParams {
  download?: boolean;
  type?: string;
  id?: string;
  name?: string;
  sectorId?: string;
  mundalId?: string;
}
