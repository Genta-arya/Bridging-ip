import { prisma } from "../Config/Prisma.js";
import { sendError, sendResponse } from "../Utils/Response.js";

export const CreateIP = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return sendResponse(res, 400, "IP tidak boleh kosong");
  }

  const findIp = await prisma.iPAddress.findFirst({
    where: {
      ip: ip,
    },
  });

  if (findIp) {
    return sendResponse(res, 400, "IP sudah terdaftar");
  }

  if (findIp.length > 0) {
    return sendResponse(res, 400, "Hanya boleh menambahkan 1 IP");
  }
  try {
    const createIp = await prisma.iPAddress.create({
      data: {
        ip,
      },
    });

    if (createIp) {
      return sendResponse(res, 200, "IP berhasil ditambahkan", createIp);
    }
  } catch (error) {
    sendError(res, error);
  }
};

export const GetIP = async (req, res) => {
  try {
    const getIp = await prisma.iPAddress.findFirst({});
   
      return sendResponse(res, 200, "List IP", getIp);

  } catch (error) {
    sendError(res, error);
  }
};

export const UpdateIP = async (req, res) => {
    const { id } = req.params;
    const { ip } = req.body;
  
    if (!ip) {
      return sendResponse(res, 400, "IP tidak boleh kosong");
    }
  
    try {
      // Cek apakah IP sudah digunakan oleh ID lain
      const existingIp = await prisma.iPAddress.findFirst({
        where: {
          ip: ip,
          NOT: {
            id: id, // Pastikan bukan ID yang sedang diupdate
          },
        },
      });
  
      if (existingIp) {
        return sendResponse(res, 400, "IP sudah digunakan oleh ID lain");
      }
  
      // Update IP jika tidak ada yang sama selain ID sendiri
      const updateIp = await prisma.iPAddress.update({
        where: {
          id: id,
        },
        data: {
          ip: ip,
        },
      });
  
      return sendResponse(res, 200, "IP berhasil diupdate", updateIp);
    } catch (error) {
      sendError(res, error);
    }
  };
  