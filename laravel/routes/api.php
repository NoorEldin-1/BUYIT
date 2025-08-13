<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admin/login', [AdminController::class, "login"]);
Route::post('/admin/edit/{adminUsername}/{adminPassword}', [AdminController::class, "edit"]);

Route::post("/category/create", [CategoryController::class, "create"]);
Route::put("/category/edit/{id}", [CategoryController::class, "edit"]);
Route::put("/category/delete/{id}", [CategoryController::class, "delete"]);
Route::get("/category/all", [CategoryController::class, "getAll"]);
Route::get("/category/show/{id}", [CategoryController::class, "show"]);

Route::post("/product/create/{category_id}", [ProductController::class, "create"]);
Route::post("/product/edit/{category_id}/{product_id}", [ProductController::class, "edit"]);
Route::put("/product/delete/{category_id}/{product_id}", [ProductController::class, "delete"]);
Route::get("/product/all/{category_id}", [ProductController::class, "getAll"]);
Route::get("/product/show/{category_id}/{product_id}", [ProductController::class, "show"]);