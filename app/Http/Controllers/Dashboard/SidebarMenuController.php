<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SidebarMenu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SidebarMenuController extends Controller
{
    public function edit()
    {
        return Inertia::render('pages/content/menus', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Menu Halaman', 'href' => '/dashboard/pages/content/menus'],
            ],
            'menus' => SidebarMenu::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, SidebarMenu $menu)
    {
        $validated = $request->validate([
            'title.id' => 'required|string|max:100',
            'title.en' => 'required|string|max:100',
            'items' => 'required|array|min:1',
            'items.*.label.id' => 'required|string|max:150',
            'items.*.label.en' => 'required|string|max:150',
            'items.*.url' => 'required|string|max:255',
        ]);

        $menu->update([
            'title' => $validated['title'],
            'items' => $validated['items'],
        ]);

        return back()->with('success', 'Menu berhasil diperbarui!');
    }

    // Endpoint publik: dipakai halaman depan mengambil menu via AJAX.
    public function show(string $group)
    {
        $menu = SidebarMenu::where('group_key', $group)->first();

        abort_unless($menu, 404);

        return response()->json([
            'group_key' => $menu->group_key,
            'title' => $menu->title,
            'items' => $menu->items,
        ]);
    }
}
