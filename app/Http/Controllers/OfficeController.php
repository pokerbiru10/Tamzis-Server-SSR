<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Services\SimulasiApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class OfficeController extends Controller
{
    public function publicIndex(SimulasiApiService $api)
    {
        $areas = Cache::remember('branch-offices', now()->addMinutes(15), function () use ($api) {
            $response = $api->get('/api/v1/branch/all');
            $branches = $response['data']['cabang'] ?? null;

            if (! ($response['status'] ?? false) || ! is_array($branches)) {
                return $this->fallbackAreasFromDatabase();
            }

            $grouped = collect($branches)->groupBy(fn ($branch) => $branch['kota'] ?? 'Lainnya');

            return $grouped->map(function ($items, $kota) {
                return [
                    'name' => $kota,
                    'offices' => $items->map(function ($branch) {
                        $lat = $branch['koordinat']['lat'] ?? null;
                        $lng = $branch['koordinat']['lng'] ?? null;

                        return [
                            'id' => $branch['id'] ?? null,
                            'name' => $branch['nama'] ?? '',
                            'phone' => $branch['telp'] ?? ($branch['whatsapp'] ?? ''),
                            'whatsapp' => $branch['whatsapp'] ?? ($branch['telp'] ?? ''),
                            'address' => $branch['alamat'] ?? '',
                            'kota' => $branch['kota'] ?? '',
                            'lat' => $lat !== null ? (float) $lat : null,
                            'lng' => $lng !== null ? (float) $lng : null,
                            'maps' => $lat && $lng ? "https://www.google.com/maps?q={$lat},{$lng}" : null,
                        ];
                    })->values()->toArray(),
                ];
            })->values()->toArray();
        });

        return Inertia::render('kantor-layanan', [
            'areasData' => $areas,
        ]);
    }

    private function fallbackAreasFromDatabase(): array
    {
        $offices = Office::orderBy('area')->get();

        $areas = [];
        foreach ($offices->groupBy('area') as $areaName => $items) {
            $areas[] = [
                'name' => $areaName,
                'offices' => $items->map(function ($item) use ($areaName) {
                    return [
                        'id' => $item->id,
                        'name' => $item->name,
                        'phone' => $item->phone,
                        'whatsapp' => $item->phone,
                        'address' => $item->address,
                        'kota' => $areaName,
                        'lat' => null,
                        'lng' => null,
                        'maps' => $item->maps_link,
                    ];
                })->values()->toArray(),
            ];
        }

        return $areas;
    }

    public function index()
    {
        return Inertia::render('alamat/index', [
            'offices' => Office::orderBy('area')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'area' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string',
            'maps_link' => 'required|url',
        ]);

        Office::create($data);

        return redirect()->back()->with('success', 'Alamat kantor berhasil ditambahkan.');
    }

    public function update(Request $request, Office $alamat)
    {
        $data = $request->validate([
            'area' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string',
            'maps_link' => 'required|url',
        ]);

        $alamat->update($data);

        return redirect()->back()->with('success', 'Alamat kantor berhasil diperbarui.');
    }

    public function destroy(Office $alamat)
    {
        $alamat->delete();

        return redirect()->back()->with('success', 'Alamat kantor berhasil dihapus.');
    }
}
