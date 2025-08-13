<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function create($category_id) {
        $admin = Admin::where("username", request()->input("adminUsername"))->where("password", request()->input("adminPassword"))->get()->first();
        if ($admin) {

            $category = Category::find($category_id);
            
            if (!$category) {
                return response()->json(["message" => "category not found"]);
            }
            
            $validator = Validator::make(request()->all(), [
            "name" => "required|string|max:255",
            "info" => "required|string",
            "price" => "required|integer",
            "image" => "required|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif",
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            $imagePath = request()->file("image")->store("images", "public");
            
            $product = Product::create([
                "name" => request("name"),
                "info" => request("info"),
                "price" => request("price"),
                "image" => $imagePath,
                "category_id" => $category_id,
            ]);
            
            $product->image = Storage::url($product->image);
            
            return response()->json($product);
        } else {
            return response()->json(["message" => "credentials error"]); 
        }
    }

    public function edit($category_id, $product_id) {
        $admin = Admin::where("username", request()->input("adminUsername"))->where("password", request()->input("adminPassword"))->get()->first();
        if ($admin) {
            $category = Category::find($category_id);
            if (!$category) {
                return response()->json(["message" => "category not found"]);
            }
            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message" => "product not found"]);
            }

            $validator = Validator::make(request()->all(), [
            "name" => "required|string|max:255",
            "info" => "required|string",
            "price" => "required|integer",
            "image" => "mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif",
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            if (request()->hasFile("image")) {
                if (Storage::disk("public")->exists($product->image)) {
                    Storage::disk("public")->delete($product->image);
                }
                $imagePath = request()->file("image")->store("images", "public");
                $product->image = $imagePath;
            }

            $product->name = request("name");
            $product->info = request("info");
            $product->price = request("price");
            $product->save();

            if (request()->hasFile("image")) {
                $product->image = Storage::url($product->image);
            }

            return response()->json($product);
        } else {
            return response()->json(["message" => "credentials error"]); 
        }
    }

    public function delete($category_id, $product_id) {
        $admin = Admin::where("username", request("adminUsername"))->where("password", request("adminPassword"))->get()->first();
        if ($admin) {
            $category = Category::find($category_id);
            if (!$category) {
                return response()->json(["message" => "category not found"]);
            }

            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message" => "product not found"]);
            }

            if (Storage::disk("public")->exists($product->image)) {
                Storage::disk("public")->delete($product->image);
            }

            $product->delete();
            return response()->json(["message" => "product deleted"]);
        } else {
            return response()->json(["message" => "credentials error"]); 
        }
    }

    public function getAll($category_id) {
        $category = Category::find($category_id);
        if (!$category) {
            return response()->json(["message" => "category not found"]);
        }
        $products = Product::where("category_id", $category_id)->get();

        foreach ($products as $product) {
            $product->image = Storage::url($product->image);
        }

        return response()->json($products);
    }

    public function show($category_id, $product_id) {
        $category = Category::find($category_id);
        if (!$category) {
            return response()->json(["message" => "category not found"]);
        }
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message" => "product not found"]);
        }

        $product->image = Storage::url($product->image);

        return response()->json($product);
    }
}
