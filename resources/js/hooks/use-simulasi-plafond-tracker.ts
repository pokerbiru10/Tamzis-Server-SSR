import { useEffect } from 'react';

// Catat setiap perubahan plafond/nominal simulasi ke Administrator
// (tabel simulasi_simpanans) setelah pengunjung mengirim data diri.
// Dikirim tertunda 800ms supaya tidak spam saat angka masih diketik.
export function useSimulasiPlafondTracker(
    plafond: number,
    hasSubmittedDataDiri: boolean,
    simulasiId: number | null,
) {
    useEffect(() => {
        if (!hasSubmittedDataDiri || !simulasiId || plafond <= 0) {
            return;
        }

        const timeout = setTimeout(() => {
            const xsrfToken = decodeURIComponent(
                document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || '',
            );

            fetch(`/simulasi-simpanan/${simulasiId}/plafond`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ plafond }),
            }).catch(() => {
                // Gagal mencatat plafond tidak perlu mengganggu simulasi
            });
        }, 800);

        return () => clearTimeout(timeout);
    }, [plafond, hasSubmittedDataDiri, simulasiId]);
}
