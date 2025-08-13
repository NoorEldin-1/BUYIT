<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function create() {
        $admin = Admin::where("username", request("adminUsername"))->where("password", request("adminPassword"))->get()->first();
        if ($admin) {
            $validator = Validator::make(request()->all(), [
                "name" => "required|string|max:255",
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors());
            }
            $category = Category::create([
                "name" => request("name"),
            ]);
            return response()->json($category);
        } else {
            return response()->json(["message" => "credentials error"]); 
        }
    }

    public function edit($id) {
        $admin = Admin::where("username", request("adminUsername"))->where("password", request("adminPassword"))->get()->first();
        if ($admin) {
            $validator = Validator::make(request()->all(), [
                "name" => "required|string|max:255",
            ]);
            
            if ($validator->fails()) {
                return response()->json($validator->errors());
            }
            
            $category = Category::find($id);
            
            if (!$category) {
                return response()->json(["message" => "category not found"]);
            }
            
            $category->name = request("name");
            $category->save();
            return response()->json($category);
        } else {
            return response()->json(["message" => "credentials error"]); 
        }
    }

    public function delete($id) {
        $admin = Admin::where("username", request("adminUsername"))->where("password", request("adminPassword"))->get()->first();
        if ($admin) {

            $category = Category::find($id);
            
            if (!$category) {
                return response()->json(["message" => "category not found"]);
            }
            
            $category->delete();
            return response()->json(["message" => "category deleted"]);
        } else {
            return response()->json(["message" => "credentials error"]); 
        }
    }

    public function getAll() {
        return response()->json(Category::all());
    }

    public function show($id) {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(["message" => "category not found"]);
        }

        return response()->json($category);
    }
}
