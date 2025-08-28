<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function total() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $total = Category::count();
            return response()->json(["total" => $total]);
        }
    }
    public function create() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $validator = Validator::make(request()->all(), [
                "name" => "required|string|max:100",
            ]);
            if ($validator->fails()) {
                return response()->json(["errors" => $validator->errors()]);
            } else {
                $category = Category::create([
                    "name" => request("name"),
                ]);
                $category = Category::withCount("products")->find($category->id);
                return response()->json(["category" => $category]);
            }
            
        }
    }

    public function edit($id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $validator = Validator::make(request()->all(), [
                "name" => "required|string|max:255",
            ]);
            if ($validator->fails()) {
                return response()->json(["errors" => $validator->errors()]);
            } else {
                $category = Category::withCount("products")->find($id);
                if ($category) {
                    $category->name = request("name");
                    $category->save();
                    return response()->json(["category" => $category]);
                } else {
                    return response()->json(["message" => "category not found"]);
                }
            }
        }
    }

    public function delete($id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $category = Category::find($id);
            if ($category) {
                foreach ($category->products as $product) {
                    if (Storage::disk("public")->exists($product->image)) {
                        Storage::disk("public")->delete($product->image);
                    }
                    foreach ($product->images as $image) {
                        if (Storage::disk("public")->exists($image->image)) {
                            Storage::disk("public")->delete($image->image);
                        }
                    }
                }
                $category->delete();
                return response()->json(["message"=> "category deleted"]);
            } else {
                return response()->json(["message" => "category not found"]);    
            }
        }
    }

    public function all() {
        $categories = Category::withCount("products")->latest()->get();
        return response()->json(["categories" => $categories]);
    }

    public function allPaginated() {
        $categories = Category::withCount("products")->latest()->simplePaginate(5);
        return response()->json(["categories" => $categories]);
    }

    public function show($id) {
        $category = Category::withCount("products")->find($id);
        if ($category) {
            return response()->json(["category" => $category]);
        } else {
            return response()->json(["message" => "category not found"]);
        }
    }
}
