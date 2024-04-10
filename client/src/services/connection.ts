import axios from "axios";

export const axGetAllConnections = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/connections/`
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const axUpdateConnection = async (
  applicant_id: string,
  connectionRecord: unknown
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/connections/${applicant_id}/`,
      {
        connection: connectionRecord,
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
