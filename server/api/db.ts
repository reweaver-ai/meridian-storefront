/** Minimal query stub — the sample has no database engine. */
export interface Row { [column: string]: string | number | null }

export async function query(sql: string, params: unknown[] = []): Promise<Row[]> {
  void sql;
  void params;
  return [];
}
