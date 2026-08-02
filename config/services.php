<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'instagram' => [
        'access_token' => env('INSTAGRAM_ACCESS_TOKEN'),
        'user_id' => env('INSTAGRAM_USER_ID'),
        'account_name' => env('INSTAGRAM_ACCOUNT_NAME', 'tamzisbinautama'),
        'rsshub_url' => env('INSTAGRAM_RSSHUB_URL', 'https://rsshub.app/instagram/user/tamzisbinautama/json'),
        'limit' => env('INSTAGRAM_FEED_LIMIT', 30),
        'media_type' => env('INSTAGRAM_MEDIA_TYPE', 'ALL'),
    ],

    'tamzis' => [
        'api_url' => env('TAMZIS_API_URL', 'http://103.52.147.11:10505'),
        'hmac_secret' => env('HMAC_SECRET_KEY'),
    ],

];
