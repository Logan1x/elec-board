import axios from "axios";

export const axGetAllConnections = async (filters) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/connections/`,
      {
        params: filters,
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const axUpdateConnection = async (
  applicant_id: number,
  connectionRecord: any
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/connections/${applicant_id}/`,
      {
        ...connectionRecord,
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
