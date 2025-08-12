<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admin/login', [AdminController::class, "login"]);
Route::post('/admin/edit/{adminUsername}/{adminPassword}', [AdminController::class, "edit"]);

