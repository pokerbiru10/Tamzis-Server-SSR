<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use App\Models\PageContent;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeSectionController extends Controller
{
    public function edit()
    {
        $sections = HomeSection::all()->pluck('data', 'key');

        // Kumpulkan semua route publik yang valid untuk validasi URL
        $validRoutes = $this->getValidPublicRoutes();

        return Inertia::render('pages/content/beranda', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Beranda', 'href' => '/dashboard/pages/content/beranda'],
            ],
            'sections' => $sections,
            'validRoutes' => $validRoutes,
        ]);
    }

    private function getValidPublicRoutes(): array
    {
        $routes = [];

        // Kumpulkan semua route GET yang bukan route dashboard/api/auth
        foreach (Route::getRoutes() as $route) {
            $uri = $route->uri();
            $methods = $route->methods();

            if (! in_array('GET', $methods)) {
                continue;
            }

            // Skip route dashboard, api, auth, dan asset
            if (
                str_starts_with($uri, 'dashboard')
                || str_starts_with($uri, 'api/')
                || str_starts_with($uri, 'login')
                || str_starts_with($uri, 'register')
                || str_starts_with($uri, 'forgot-password')
                || str_starts_with($uri, 'reset-password')
                || str_starts_with($uri, 'verify-email')
                || str_starts_with($uri, 'sanctum/')
                || str_starts_with($uri, 'livewire/')
                || str_contains($uri, 'telescope')
            ) {
                continue;
            }

            // Hanya ambil slug sederhana (tanpa parameter)
            if (! str_contains($uri, '{') && ! str_contains($uri, '?')) {
                $routes[] = '/'.$uri;
            }
        }

        // Tambahkan dynamic pages dari database
        $pageSlugs = PageContent::where('is_published', true)
            ->pluck('slug')
            ->unique()
            ->toArray();

        foreach ($pageSlugs as $slug) {
            $routes[] = '/'.$slug;
        }

        return array_unique($routes);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'stats' => 'required|array',
            'stats.id' => 'required|array|size:4',
            'stats.id.*.value' => 'required|numeric|min:0',
            'stats.id.*.suffix' => 'required|string|max:5',
            'stats.id.*.label' => 'required|string|max:100',
            'stats.en' => 'required|array|size:4',
            'stats.en.*.value' => 'required|numeric|min:0',
            'stats.en.*.suffix' => 'required|string|max:5',
            'stats.en.*.label' => 'required|string|max:100',
            'why' => 'required|array',
            'why.id.title' => 'required|string|max:255',
            'why.id.description' => 'required|string|max:1000',
            'why.id.reasons' => 'required|array|size:4',
            'why.id.reasons.*.title' => 'required|string|max:100',
            'why.id.reasons.*.description' => 'required|string|max:255',
            'why.id.reasons.*.icon' => 'nullable|string|max:50',
            'why.en.title' => 'required|string|max:255',
            'why.en.description' => 'required|string|max:1000',
            'why.en.reasons' => 'required|array|size:4',
            'why.en.reasons.*.title' => 'required|string|max:100',
            'why.en.reasons.*.description' => 'required|string|max:255',
            'why.en.reasons.*.icon' => 'nullable|string|max:50',
            'featured' => 'required|array',
            'featured.id.badge' => 'required|string|max:100',
            'featured.id.title' => 'required|string|max:255',
            'featured.id.description' => 'required|string|max:1000',
            'featured.id.readMore' => 'required|string|max:50',
            'featured.id.categories' => 'required|array|size:3',
            'featured.id.categories.*.name' => 'required|string|max:50',
            'featured.id.categories.*.products' => 'required|array|size:4',
            'featured.id.categories.*.products.*.title' => 'required|string|max:100',
            'featured.id.categories.*.products.*.href' => 'required|string|max:255',
            'featured.id.categories.*.products.*.desc' => 'required|string|max:255',
            'featured.id.categories.*.products.*.tag' => 'required|string|max:30',
            'featured.id.categories.*.products.*.imageUrl' => 'nullable|string|max:500',
            'featured.id.categories.*.products.*.imageFit' => 'nullable|in:cover,contain',
            'featured.en.badge' => 'required|string|max:100',
            'featured.en.title' => 'required|string|max:255',
            'featured.en.description' => 'required|string|max:1000',
            'featured.en.readMore' => 'required|string|max:50',
            'featured.en.categories' => 'required|array|size:3',
            'featured.en.categories.*.name' => 'required|string|max:50',
            'featured.en.categories.*.products' => 'required|array|size:4',
            'featured.en.categories.*.products.*.title' => 'required|string|max:100',
            'featured.en.categories.*.products.*.href' => 'required|string|max:255',
            'featured.en.categories.*.products.*.desc' => 'required|string|max:255',
            'featured.en.categories.*.products.*.tag' => 'required|string|max:30',
            'featured.en.categories.*.products.*.imageUrl' => 'nullable|string|max:500',
            'featured.en.categories.*.products.*.imageFit' => 'nullable|in:cover,contain',
            'standards' => 'required|array',
            'standards.id.title' => 'required|string|max:255',
            'standards.id.subtitle' => 'required|string|max:1000',
            'standards.id.items' => 'required|array|size:5',
            'standards.id.items.*.title' => 'required|string|max:100',
            'standards.id.items.*.desc' => 'required|string|max:255',
            'standards.id.items.*.icon' => 'nullable|string|max:50',
            'standards.en.title' => 'required|string|max:255',
            'standards.en.subtitle' => 'required|string|max:1000',
            'standards.en.items' => 'required|array|size:5',
            'standards.en.items.*.title' => 'required|string|max:100',
            'standards.en.items.*.desc' => 'required|string|max:255',
            'standards.en.items.*.icon' => 'nullable|string|max:50',
            'choices' => 'required|array',
            'choices.id.badge' => 'required|string|max:100',
            'choices.id.title' => 'required|string|max:255',
            'choices.id.description' => 'required|string|max:1000',
            'choices.id.readMore' => 'required|string|max:50',
            'choices.id.cards' => 'required|array|size:3',
            'choices.id.cards.*.title' => 'required|string|max:100',
            'choices.id.cards.*.description' => 'required|string|max:500',
            'choices.id.cards.*.href' => 'required|string|max:255',
            'choices.id.cards.*.tag' => 'required|string|max:30',
            'choices.en.badge' => 'required|string|max:100',
            'choices.en.title' => 'required|string|max:255',
            'choices.en.description' => 'required|string|max:1000',
            'choices.en.readMore' => 'required|string|max:50',
            'choices.en.cards' => 'required|array|size:3',
            'choices.en.cards.*.title' => 'required|string|max:100',
            'choices.en.cards.*.description' => 'required|string|max:500',
            'choices.en.cards.*.href' => 'required|string|max:255',
            'choices.en.cards.*.tag' => 'required|string|max:30',
            'baitulmaal' => 'required|array',
            'baitulmaal.id.badge' => 'required|string|max:100',
            'baitulmaal.id.title' => 'required|string|max:255',
            'baitulmaal.id.description' => 'required|string|max:1000',
            'baitulmaal.id.showMore' => 'required|string|max:50',
            'baitulmaal.en.badge' => 'required|string|max:100',
            'baitulmaal.en.title' => 'required|string|max:255',
            'baitulmaal.en.description' => 'required|string|max:1000',
            'baitulmaal.en.showMore' => 'required|string|max:50',
            'highlights' => 'required|array',
            'highlights.id.badge' => 'required|string|max:100',
            'highlights.id.title' => 'required|string|max:255',
            'highlights.id.viewAll' => 'required|string|max:50',
            'highlights.en.badge' => 'required|string|max:100',
            'highlights.en.title' => 'required|string|max:255',
            'highlights.en.viewAll' => 'required|string|max:50',
        ]);

        // Jaga path gambar yang sudah tersimpan agar tidak hilang saat simpan teks.
        $existingWhy = HomeSection::where('key', 'why')->first();
        if ($existingWhy && isset($existingWhy->data['image'])) {
            $validated['why']['image'] = $existingWhy->data['image'];
        }

        // Gambar produk featured hanya boleh diubah lewat endpoint upload khusus.
        // Form utama bisa mengirim path basi (state lama di browser) jika admin
        // menyimpan teks setelah upload foto tanpa reload halaman, jadi path gambar
        // di database SELALU jadi acuan dan mengabaikan apa pun yang dikirim form ini.
        $existingFeatured = HomeSection::where('key', 'featured')->first();
        if ($existingFeatured && isset($existingFeatured->data['categories'])) {
            foreach ($existingFeatured->data['categories'] as $ci => $cat) {
                if (isset($cat['products'])) {
                    foreach ($cat['products'] as $pi => $product) {
                        if (isset($product['imageUrl'])) {
                            $validated['featured']['categories'][$ci]['products'][$pi]['imageUrl'] = $product['imageUrl'];
                        } else {
                            unset($validated['featured']['categories'][$ci]['products'][$pi]['imageUrl']);
                        }
                        if (isset($product['imageFit'])) {
                            $validated['featured']['categories'][$ci]['products'][$pi]['imageFit'] = $product['imageFit'];
                        } else {
                            unset($validated['featured']['categories'][$ci]['products'][$pi]['imageFit']);
                        }
                    }
                }
            }
        }

        foreach (['stats', 'why', 'featured', 'standards', 'choices', 'baitulmaal', 'highlights'] as $key) {
            HomeSection::updateOrCreate(
                ['key' => $key],
                ['data' => $validated[$key]],
            );
        }

        return back()->with('success', 'Konten beranda berhasil diperbarui!');
    }

    public function uploadWhyImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:1024',
        ]);

        $section = HomeSection::firstOrCreate(['key' => 'why'], ['data' => []]);
        $data = $section->data;

        // Delete old uploaded image (never the default asset)
        if (isset($data['image']) && str_starts_with($data['image'], 'uploads/') && file_exists(public_path($data['image']))) {
            ImageOptimizer::deleteSibling($data['image']);
            unlink(public_path($data['image']));
        }

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/beranda/why');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);
        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1200, 80);
        $data['image'] = 'uploads/images/beranda/why/'.$filename;

        $section->update(['data' => $data]);

        return back()->with('success', 'Gambar berhasil diperbarui!');
    }

    public function uploadFeaturedImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:1024',
            'category_index' => 'required|integer|min:0|max:2',
            'product_index' => 'required|integer|min:0|max:3',
        ]);

        $section = HomeSection::firstOrCreate(['key' => 'featured'], ['data' => []]);
        $data = $section->data;

        $ci = $request->category_index;
        $pi = $request->product_index;

        // Delete old uploaded image for this product
        if (
            isset($data['categories'][$ci]['products'][$pi]['imageUrl'])
            && str_starts_with($data['categories'][$ci]['products'][$pi]['imageUrl'], 'uploads/')
            && file_exists(public_path($data['categories'][$ci]['products'][$pi]['imageUrl']))
        ) {
            ImageOptimizer::deleteSibling($data['categories'][$ci]['products'][$pi]['imageUrl']);
            unlink(public_path($data['categories'][$ci]['products'][$pi]['imageUrl']));
        }

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/beranda/featured');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);
        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1200, 80);
        $data['categories'][$ci]['products'][$pi]['imageUrl'] = 'uploads/images/beranda/featured/'.$filename;

        $section->update(['data' => $data]);

        return back()->with('success', 'Gambar produk berhasil diperbarui!');
    }
}
