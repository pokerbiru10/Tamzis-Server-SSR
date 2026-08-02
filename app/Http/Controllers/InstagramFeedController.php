<?php

namespace App\Http\Controllers;

use App\Services\InstagramFeedService;
use Illuminate\Http\JsonResponse;

class InstagramFeedController extends Controller
{
    public function index(InstagramFeedService $service): JsonResponse
    {
        return response()->json([
            'data' => $service->getFeed(),
        ]);
    }
}
