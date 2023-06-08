type DjangoResponse<DataType> = {
  results: DataType[];
  count: number;
  next: string | null;
  previous: string | null;
};
