import multer from "multer";

const storage = multer.memoryStorage({ limit: "2mb" });

export const upload = multer({ storage });
