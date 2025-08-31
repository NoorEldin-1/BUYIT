<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Save;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SaveController extends Controller
{
    public function toggleSave($product_id) {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message" => "product not found"]);
        } else {
            $save = Save::where("user_id", request()->user()->id)->where("product_id", $product_id)->first();
            if ($save) {
                $save->delete();
                return response()->json(["message" => "saved deleted"]);
            } else {
                $save = Save::create([
                    "user_id" => request()->user()->id,
                    "product_id" => $product_id,
                ]);
                $save = Save::where("user_id", request()->user()->id)->where("product_id", $product_id)->with("product")->first();
                $save->product->image = Storage::url($save->product->image);
                return response()->json(["save" => $save]);
            }
        }
    }

    public function all() {
        $saves = Save::where("user_id", request()->user()->id)->with("product")->latest()->get();
        foreach ($saves as $save) {
            $save->product->image = Storage::url($save->product->image);
        }
        return response()->json(["saves"=> $saves]);
    }
}
