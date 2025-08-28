<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Save;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SaveController extends Controller
{
    public function create($product_id) {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message" => "product not found"]);
        } else {
            $save = Save::create([
                "user_id" => request()->user()->id,
                "product_id" => $product_id,
            ]);
            return response()->json(["save" => $save]);
        }
    }

    public function delete($product_id) {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message"=> "product not found"]);
        } else {
            $save = Save::where("user_id", request()->user()->id)->where("product_id", $product_id)->first();
            if (!$save) {
                return response()->json(["message"=> "save not found"]);
            } else {
                $save->delete();
                return response()->json(["message"=> "saved deleted"]);
            }
        }
    }

    public function product($product_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);
        } else {
            $product = Product::find($product_id);
            if (!$product) {
                return response()->json(["message"=> "product not found"]);
            } else {
                $saves = Save::where("product_id", $product_id)->with("user")->get();
                return response()->json(["saves"=> $saves]);
            }
        }
    }
        
    public function user($user_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);
        } else {
            $saves = Save::where("user_id", $user_id)->with("product")->get();
            foreach ($saves as $save) {
                $save->product->image = Storage::url($save->product->image);
            }
            return response()->json(["saves"=> $saves]);
        }
    }
}
