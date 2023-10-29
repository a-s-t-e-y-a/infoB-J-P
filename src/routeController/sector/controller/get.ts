import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";
import { CustomError } from "../../../utlis/throwError";
import karykarta from "src/routeController/karyakarta/route";
import { Workbook } from "excel4node";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";
const prisma = new PrismaClient();
export async function getSectorById(req: Request, res: Response) {
  try {
    const sectorId = parseInt(req.params.id);
    const download = Boolean(req.query.download) as Boolean;
    const type = req.query.type as string;
    const sector = await prisma.sector.findMany({
      where: {
        id: sectorId,
      },
      include: {
        mundal: true,
        karykarta: true,
      },
    });

    if (!sector) {
      throw new CustomError("sector does not found", 404, "Bad request");
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
          "Sector Name",
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
        sector.forEach((karykarta) => {
          karykarta.karykarta.map((info) => {
            ws.cell(count, 1).number(karykarta.id).style(style);
            ws.cell(count, 2).string(karykarta.name).style(style);
            ws.cell(count, 2).string(info.name).style(style);
            ws.cell(count, 2).string(info.address).style(style);
            ws.cell(count, 2).string(info.mobileNumber).style(style);
            ws.cell(count, 2).string(info.dob).style(style);
            ws.cell(count, 2).string(info.religion).style(style);
            ws.cell(count, 2).string(info.gender).style(style);
            ws.cell(count, 2).string(info.previousParty).style(style);
            ws.cell(count, 2).string(info.role).style(style);
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
          "Sector Name",
          "karykarta Name",
          "address",
          "Mobile Number",
          "Date of birth",
          "Religion",
          "Gender",
          "Previous Party",
          "Role",
        ];

        const body = sector.flatMap((karykarta) =>
          karykarta.karykarta.map((info) => [
            karykarta.id,
            karykarta.name,
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
        message: "Sector retrieved successfully",
        data: sector,
      });
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

export async function getAllSectors(req: Request, res: Response) {
  try {
    const { mundalId } = req.query;
    const download = Boolean(req.query.download) as Boolean;
    const type = req.query.type as string;
    const where = {};

    // If mundalId is provided, filter by it
    if (mundalId) {
      where["mundalId"] = parseInt(mundalId.toString());
    }

    const sectors = await prisma.sector.findMany({
      where,
      include: {
        mundal: true,
        village: true,
        karykarta: true,
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
          "Sector Name",
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
        sectors.forEach((karykarta) => {
          karykarta.karykarta.map((info) => {
            ws.cell(count, 1).number(karykarta.id).style(style);
            ws.cell(count, 2).string(karykarta.name).style(style);
            ws.cell(count, 2).string(info.name).style(style);
            ws.cell(count, 2).string(info.address).style(style);
            ws.cell(count, 2).string(info.mobileNumber).style(style);
            ws.cell(count, 2).string(info.dob).style(style);
            ws.cell(count, 2).string(info.religion).style(style);
            ws.cell(count, 2).string(info.gender).style(style);
            ws.cell(count, 2).string(info.previousParty).style(style);
            ws.cell(count, 2).string(info.role).style(style);
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
          "Sector Name",
          "karykarta Name",
          "address",
          "Mobile Number",
          "Date of birth",
          "Religion",
          "Gender",
          "Previous Party",
          "Role",
        ];

        const body = sectors.flatMap((karykarta) =>
          karykarta.karykarta.map((info) => [
            karykarta.id,
            karykarta.name,
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
        message: "Sectors retrieved successfully",
        data: sectors,
      });
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
