import { ApiEndpoint } from "../types/enums";

export const apiPathBuilder = () => {
  const getRecordPath = (
    recordId: number | undefined
  ) => `${ApiEndpoint.Record}${recordId}/`;

  return { getRecordPath };
};
