<?php

namespace App\Http\Controllers;

use App\Models\SimulasiSimpanan;
use Illuminate\Http\Request;

class SimulasiSimpananController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'no_hp' => 'required|string|max:20',
            'jenis_simulasi' => 'required|string|max:50',
            'plafond' => 'nullable|numeric|min:0',
        ]);

        $simulasi = SimulasiSimpanan::create($validated);

        return back()
            ->with('success', 'Data simulasi berhasil disimpan.')
            ->with('simulasi_id', $simulasi->id);
    }

    public function updatePlafond(Request $request, SimulasiSimpanan $simulasiSimpanan)
    {
        $validated = $request->validate([
            'plafond' => 'required|numeric|min:0',
        ]);

        $simulasiSimpanan->update($validated);

        return response()->json(['status' => true]);
    }
}
