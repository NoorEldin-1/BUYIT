<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->group(function () {
    Route::get("/user/all","all")->middleware("auth:sanctum");
    Route::post("/signup", "signup");
    Route::post("/admin/login", "adminLogin");
    Route::get("/user/login", "userLogin");
    Route::put("admin/edit", "editAdmin")->middleware("auth:sanctum");
    Route::put("user/edit", "toggleRole")->middleware("auth:sanctum");
    Route::delete("user/delete/{user_id}", "deleteUser")->middleware("auth:sanctum");
    Route::get("auth/google/redirect", "googleRedirect");
    Route::get("auth/google/callback", "googleCallback");
    Route::delete("/logout", "logout")->middleware("auth:sanctum");
    Route::get("/user/total", "total")->middleware("auth:sanctum");
    Route::get("/user/latest", "latest")->middleware("auth:sanctum");
});

Route::controller(CategoryController::class)->group(function () {
    Route::post("/category/create", "create")->middleware("auth:sanctum");
    Route::put("/category/edit/{id}", "edit")->middleware("auth:sanctum");
    Route::delete("/category/delete/{id}", "delete")->middleware("auth:sanctum");
    Route::get("category/all", "all");
    Route::get("category/all/paginated", "allPaginated");
    Route::get("/category/show/{id}", "show");
    Route::get("/category/total","total")->middleware("auth:sanctum");
});

Route::controller(ProductController::class)->group(function () {
    Route::post("/product/create/{category_id}", "create")->middleware("auth:sanctum");
    Route::post("/product/edit/{product_id}", "edit")->middleware("auth:sanctum");
    Route::delete("/product/delete/{product_id}", "delete")->middleware("auth:sanctum");
    Route::get("/product/all", "allProducts")->middleware("auth:sanctum");
    Route::get("/product/all/{category_id}", "allCategoryProducts")->middleware("auth:sanctum");
    Route::get("/product/show/{product_id}", "show");
    Route::get("/product/category/{category_id}", "categoryProducts");
    Route::get("/product/search/category/{category_id}", "searchCategoryProducts");
    Route::get("/product/total", "total")->middleware("auth:sanctum");
    Route::put("/product/addEvent/{product_id}", "addEvent")->middleware("auth:sanctum");
    Route::put("/product/removeEvent/{product_id}", "removeEvent")->middleware("auth:sanctum");
    Route::get("/product/events", "events");
    Route::get("/landing", "landing");

});

Route::controller(ProductImageController::class)->group(function () {
    Route::post("/product-image/create/{product_id}", "create")->middleware("auth:sanctum");
    Route::delete("/product-image/delete/{image_id}", "delete")->middleware("auth:sanctum");
    Route::get("/product-image/all/{product_id}", "all");
});

Route::controller(SaveController::class)->group(function () {
    Route::post("/save/create/{product_id}", "create")->middleware("auth:sanctum");
    Route::delete("/save/delete/{product_id}", "delete")->middleware("auth:sanctum");
    Route::get("/save/all/product/{product_id}", "product")->middleware("auth:sanctum");
    Route::get("/save/all/user/{user_id}", "user")->middleware("auth:sanctum");
});

Route::controller(CommentController::class)->group(function () {
    Route::post("/comment/create/{product_id}", "create")->middleware("auth:sanctum");
    Route::delete("/comment/delete/{product_id}/{comment_id}", "delete")->middleware("auth:sanctum");
    Route::get("/comment/all/product/{product_id}", "product");
    Route::get("/comment/all/user/{user_id}", "user")->middleware("auth:sanctum");
});
