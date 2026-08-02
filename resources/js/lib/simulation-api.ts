export async function fetchSimulation(
    path: string,
    params: URLSearchParams,
    signal?: AbortSignal,
): Promise<any> {
    const response = await fetch(`${path}?${params.toString()}`, {
        signal,
    });

    return response.json();
}
