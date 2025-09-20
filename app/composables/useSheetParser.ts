export async function parseTable(input: string | ArrayBuffer | any): Promise<string[][]> {
  try {
    const XLSX = await import("xlsx");
    let rows: any[] = [];

    // String input (CSV/TXT)
    if (typeof input === "string") {
      try {
        const wb = XLSX.read(input, { type: "string" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
      } catch (e) {
        rows = [];
      }

      const looksLikeTable = rows && rows.length > 0 && rows.some((r) => Array.isArray(r) && r.length >= 1);
      if (!looksLikeTable) {
        // Fallback to manual parsing (whitespace/tab separated or messy files)
        const lines = input
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l && !/^#/.test(l));

        rows = lines.map((line) => {
          if (line.includes(",")) return line.split(",").map((c) => c.trim());
          if (line.includes("\t")) return line.split("\t").map((c) => c.trim());
          return line.split(/\s+/).filter((c) => c.length > 0);
        });
      }
    }

    // ArrayBuffer/Uint8Array for Excel files
    else if (input instanceof ArrayBuffer || (typeof Uint8Array !== 'undefined' && input instanceof Uint8Array)) {
      const wb = XLSX.read(input, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
    }

    // Worksheet object
    else {
      const ws = input;
      rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
    }

    return rows as string[][];
  } catch (err) {
    console.error("parseTable error:", err);
    return [];
  }
}
