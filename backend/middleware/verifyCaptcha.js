import axios from "axios";

export const verifyCaptcha = async (captchaToken) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Erro ao verificar o reCAPTCHA:", error);
    return false;
  }
};
