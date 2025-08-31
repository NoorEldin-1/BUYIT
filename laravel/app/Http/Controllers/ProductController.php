<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Save;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function total() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message" => "unauthorized"]);
        } else {
            $total = Product::count();
            return response()->json(["total" => $total]);
        }
    }
    public function create($category_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message" => "unauthorized"]);
        } else {
            $category = Category::find($category_id);
            if (!$category) {
                return response()->json(["message" => "category not found"]);
            } else {
                $validator = Validator::make(request()->all(), [
                    "name" => "required|string|max:255",
                    "info" => "required|string",
                    "price" => "required|numeric",
                    "image" => "required|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif",
                    "images.*" => "required|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif",
                ]);
                if ($validator->fails()) {
                    return response()->json(["errors" => $validator->errors()]);
                } else {
                    $image = request()->file("image")->store("images", "public");
                    
                    $product = Product::create([
                        "name" => request("name"),
                        "info" => request("info"),
                        "price" => request("price"),
                        "image" => $image,
                        "category_id" => $category_id,
                    ]);

                    if (request()->hasFile('images')) {
                        foreach (request()->file('images') as $image) {
                            $path = $image->store('images', 'public');
                            ProductImage::create([
                                'image' => $path,
                                'product_id' => $product->id,
                            ]);
                        }
                    }

                    $product->image = Storage::url($product->image);
                    return response()->json(["product" => $product]);
                }
            }
        }
    }

    public function edit($product_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);
        } else {
            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message"=> "product not found"]);
            } else {
                $validator = Validator::make(request()->all(), [
                    "name" => "required|string|max:255",
                    "info"=> "required|string",
                    "price"=> "required|numeric",
                    "category_id"=> "required|exists:categories,id",
                ]);
                if ($validator->fails()) {
                    return response()->json(["errors"=> $validator->errors()]);
                } else {
                    if (request()->hasFile("image")) {
                        $validator = Validator::make(request()->all(), [
                            "image"=> "required|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif",
                        ]);
                        if ($validator->fails()) {
                            return response()->json(["errors"=> $validator->errors()]);
                        } else {
                            Storage::disk("public")->delete($product->image);
                            $product->image = request()->file("image")->store("images", "public");
                        }
                    }
                    if (request()->hasFile("images")) {
                        $validator = Validator::make(request()->all(), [
                            "images.*"=> "required|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif",
                        ]);
                        if ($validator->fails()) {
                            return response()->json(["errors"=> $validator->errors()]);
                        } else {
                            foreach (request()->file("images") as $image) {
                                $path = $image->store("images", "public");
                                ProductImage::create([
                                    "image"=> $path,
                                    "product_id"=> $product->id,
                                ]);
                            }
                        }
                    }
                    $product->name = request("name");
                    $product->info = request("info");
                    $product->price = request("price");
                    $product->category_id = request("category_id");
                    $product->save();
                    return response()->json(["product" => $product]);
                }
            }
        }
    }

    public function delete($product_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);
        } else {
            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message"=> "product not found"]);
            } else {
                if (Storage::disk("public")->exists($product->image)) {
                    Storage::disk("public")->delete($product->image);
                }
                foreach ($product->images as $image) {
                    if (Storage::disk("public")->exists($image->image)) {
                        Storage::disk("public")->delete($image->image);
                    }
                }
                $product->delete();
                return response()->json(["message"=> "product deleted"]);
            }
        }
    }

    public function allProducts() {
        $products = Product::with("category")->latest()->simplePaginate(5);
        foreach ($products as $product) {
            $product->image = Storage::url($product->image);
        }
        return response()->json(["products" => $products]);
    }

    public function addEvent($product_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);
        } else {
            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message"=> "product not found"]);
            } else {
                $product->is_event = "yes";
                $product->save();
                return response()->json(["product" => $product]);
            }
        }
    }
    
    public function removeEvent($product_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message"=> "product not found"]);    
            } else {
                $product->is_event = "no";
                $product->save();
                return response()->json(["product" => $product]);    
            }
        }
    }
    public function show($product_id) {
        $product = Product::with("category")->with("images")->find($product_id);
        if (!$product) {
            return response()->json(["message" => "product not found"]);
        } else {
            foreach ($product->images as $image) {
                $image->image = Storage::url($image->image);
            }
            $product->image = Storage::url($product->image);
            return response()->json(["product" => $product]);
        }
    }

     public function categoryProducts($category_id) {
        $products = Product::where("category_id", $category_id)->with("category")->latest()->get();
        foreach ($products as $product) {
            $product->image = Storage::url($product->image);
        }
        return response()->json(["products" => $products]);
    }

    public function events() {
            $products = Product::where("is_event", "yes")->with("category")->latest()->get();
            foreach ($products as $product) {
                $product->image = Storage::url($product->image);
            }
            return response()->json(["products" => $products]);
    }

    public function landing() {
        $products = Category::with(["products" => function($query) {
            $query->orderBy("id","desc")->take(5);
        }])->get();
        foreach ($products as $product) {
            foreach ($product->products as $product) {
                $product->image = Storage::url($product->image);
            }
        }

        
        return response()->json(["products" => $products]);
    }

    public function searchCategoryProducts($category_id) {
        $search = request("search");
        $products = Product::where("category_id", $category_id)->where("name", "like", "%{$search}%")->with("category")->latest()->get();
        foreach ($products as $product) {
            $product->image = Storage::url($product->image);
        }
        return response()->json(["products" => $products]);
    }
}
