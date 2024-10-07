import { ApiEndpoint } from "../types/enums";

export const getRecordApiPath = (recordId: number | undefined) =>
  `${ApiEndpoint.Record}${recordId}/`;
