export type ApiResponse = {
  response: Response;
  data: any;
};

export async function apiPost(action: string, body: any) {
  const response = await fetch(action, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const jsonBody = await response.json();
  return {
    response,
    data: jsonBody,
  } satisfies ApiResponse;
}

export async function apiGet(action: string) {
  const response = await fetch(action);
  const jsonBody = await response.json();
  return {
    response,
    data: jsonBody,
  } satisfies ApiResponse;
}
