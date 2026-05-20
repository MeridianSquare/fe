import type {
  ApiErrorBody,
  CreateInvestorPayload,
  Investor,
} from "../types/investor";

const API_BASE = "/api";

async function parseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    if (body.details && body.details.length > 0) {
      return body.details.join(". ");
    }
    return body.error;
  } catch {
    return "An unexpected error occurred";
  }
}

export async function createInvestor(
  payload: CreateInvestorPayload
): Promise<Investor> {
  const response = await fetch(`${API_BASE}/investors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as { investor: Investor };
  return data.investor;
}

export async function getInvestorById(id: string): Promise<Investor> {
  const response = await fetch(`${API_BASE}/investors/${id}`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as { investor: Investor };
  return data.investor;
}
