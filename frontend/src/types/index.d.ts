import { AxiosError } from "axios";

declare global {
  interface DjangoResponse<DataType> {
    results: DataType[];
    count: number;
    next: string | null;
    previous: string | null;
  }

  interface DjangoErrorResponse {
    detail: string;
  }

  type DjangoError = AxiosError<DjangoErrorResponse>;

  type PropertyIdProp = { propertyId: number };
}
