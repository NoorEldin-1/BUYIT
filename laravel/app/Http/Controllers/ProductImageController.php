<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductImageController extends Controller
{
    public function create($product_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message" => "unauthorized"]);
        } else {
            $product = Product::find($product_id);
            $uploadedImages = [];
            if (!$product) {
                return response()->json(["message" => "product not found"]);
            } else {
                $validator = Validator::make(request()->all(), [
                    "images.*" => "required|mimes:jpeg,png,jpg,gif,svg,webp,bmp,tiff,tif,ico,heic,heif,avif"
                ]);
                if ($validator->fails()) {
                    return response()->json(["errors" => $validator->errors()]);
                } else {
                    foreach (request()->file("images") as $image) {
                        $image->store("images", "public");
                        $productImage = ProductImage::create([
                            "product_id" => $product_id,
                            "image" => $image,
                        ]);
                        $productImage->image = Storage::url($productImage->image);
                        $uploadedImages[] = $productImage;
                    }
                    return response()->json(["images" => $uploadedImages]);
                }
            }
            
        }
    }

    public function delete($image_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message" => "unauthorized"]);
        } else {
            $image = ProductImage::find($image_id);
            if (!$image) {
                return response()->json(["message" => "image not found"]);
            } else {
                    if (Storage::disk("public")->exists($image->image)) {
                        Storage::disk("public")->delete($image->image);
                    }
                    $image->delete();
                    return response()->json(["message" => "image deleted"]);
            }
        }
    }
    
    public function all($product_id) {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message" => "product not found"]);
        } else {
            $productImages = ProductImage::where("product_id", $product_id)->get();
            foreach ($productImages as $productImage) {
                $productImage->image = Storage::url($productImage->image);
            }
            return response()->json(["images" => $productImages]);
        }
    }
}
