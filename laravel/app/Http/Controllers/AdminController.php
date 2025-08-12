<?php

namespace App\Http\Controllers;

use App\Models\Admin;

class AdminController extends Controller
{
    public function login()
    {
        $user = Admin::where("username", request("username"))->where("password", request("password"))->get()->first();
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(["message" => "credentials error"]);
        }
    }
    
    public function edit($adminUsername, $adminPassword)
    {
        $user = Admin::where("username", $adminUsername)->where("password", $adminPassword)->get()->first();
        if ($user) {
            if (request("username")) {
                $user->username = request("username");
            }
            if (request("password")) {
                $user->password = request("password");
            }
            $user->save();
            return response()->json($user);
        } else {
            return response()->json(["message" => "credentials error"]);
        }
    }
}
