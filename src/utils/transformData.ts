export function transformData(jsonData: any) {
  const { cols, data } = jsonData;
  return data.map((row: any[]) => {
    const record: any = {};
    cols.forEach((col: string, index: number) => {
      record[col] = row[index];
    });
    return record;
  });
}
