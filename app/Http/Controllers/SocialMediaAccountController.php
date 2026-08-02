<?php

namespace App\Http\Controllers;

use App\Models\SocialMediaAccount;
use Illuminate\Http\Request;

class SocialMediaAccountController extends Controller
{
    public function index()
    {
        $accounts = SocialMediaAccount::orderBy('sort_order')->orderBy('id')->get();

        return inertia('sosmed/index', [
            'accounts' => $accounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'icon' => 'required|string|max:100',
            'url' => 'required|url|max:500',
            'button_color' => 'required|string|max:20',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        SocialMediaAccount::create($validated);

        return redirect()->back()->with('success', 'Akun sosmed berhasil ditambahkan.');
    }

    public function update(Request $request, SocialMediaAccount $sosmed)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'icon' => 'required|string|max:100',
            'url' => 'required|url|max:500',
            'button_color' => 'required|string|max:20',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $sosmed->update($validated);

        return redirect()->back()->with('success', 'Akun sosmed berhasil diperbarui.');
    }

    public function destroy(SocialMediaAccount $sosmed)
    {
        $sosmed->delete();

        return redirect()->back()->with('success', 'Akun sosmed berhasil dihapus.');
    }

    public function toggleActive(SocialMediaAccount $sosmed)
    {
        $sosmed->update(['is_active' => ! $sosmed->is_active]);

        return redirect()->back()->with('success', 'Status akun sosmed berhasil diubah.');
    }
}
