<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{

    public function all() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $users = User::where("role", "user")->get();
            return response()->json(["users" => $users]);    
        }
    }

    public function latest() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $users = User::where("role", "user")->latest()->take(5)->get();
            return response()->json(["users" => $users]);    
        }
    }
    public function signup() {
        $validator = Validator::make(request()->all(), [
            "fullName" => "required|string|max:100",
            "username" => "required|string|max:100|unique:users",
            "password" => "required|string|min:8",
            "confirm_password" => "required|string|min:8|same:password",
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()]);
        } else {
            $user = User::create([
                "full_name" => request("fullName"),
                "username" => request("username"),
                "password" => request("password"),
            ]);

            $token = $user->createToken("auth-token")->plainTextToken;

            return response()->json(["user" => $user, "token" => $token]);
        }
    }

    public function adminLogin() {
        $user = User::where("username", request("username"))->first();
        if (!$user) {
            return response()->json(["message"=> "credentials error"]);
        }
        if (!Hash::check(request("password"), $user->password)) {
            return response()->json(["message"=> "credentials error"]);
        }
        if ($user->role != "admin") {
            return response()->json(["message"=> "credentials error"]);
        }

        $token = $user->createToken("auth-token")->plainTextToken;
        return response()->json(["user" => $user, "token" => $token]);
    }

    public function userLogin() {
        $user = User::where("username", request("username"))->first();
        if (!$user) {
            return response()->json(["message"=> "credentials error"]);
        }
        if (!Hash::check(request("password"), $user->password)) {
            return response()->json(["message"=> "credentials error"]);
        }

        $token = $user->createToken("auth-token")->plainTextToken;
        return response()->json(["user" => $user, "token" => $token]);
    }

    public function editAdmin() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            if (request("password")) {
                $validator = Validator::make(request()->all(), [
                    "fullName" => "required|string|max:100",
                    "username" => "required|string|max:100|unique:users",
                    "password" => "required|string|min:8",
                ]);
                if ($validator->fails()) {
                    return response()->json(["errors" => $validator->errors()]);
                } else {
                    $user->full_name = request("fullName");
                    $user->username = request("username");
                    $user->password = request("password");
                    $user->save();
                    return response()->json(["user" => $user]);
                }
            } else {
                $validator = Validator::make(request()->all(), [
                    "fullName" => "required|string|max:100",
                    "username" => "required|string|max:100|unique:users",
                ]);
                if ( $validator->fails()) {
                    return response()->json(["errors"=> $validator->errors()]);
                } else {
                    $user->full_name = request("fullName");
                    $user->username = request("username");
                    $user->save();
                    return response()->json(["user" => $user]);
                }
            }
        }
    }

    public function toggleRole() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $user->role = $user->role == "admin" ? "user" : "admin";
            $user->save();
            return response()->json(["user" => $user]);
        }
    }

    public function deleteUser($user_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $deletedUser = User::where("id", $user_id)->first();
            if ($deletedUser) {
                $deletedUser->delete();
                return response()->json(["message" => "user deleted successfully"]);    
            } else {
                return response()->json(["message"=> "user not found"]);    
            }
        }
    }

    public function logout() {
        $user = request()->user();
        if ($user) {
            $user->tokens()->delete();
            return response()->json(["message"=> "logout successfully"], 200);    
        } else {
            return response()->json(["message"=> "logout successfully"], 200);    
        }
    }

    public function total() {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);    
        } else {
            $total = User::where("role", "user")->count();
            return response()->json(["total"=> $total]);    
        }
    }

    public function googleRedirect() {
        return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    }

    public function googleCallback() {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::where('google_id', $googleUser->id)->first();

            if (!$user) {
                $user = User::where('email', $googleUser->email)->first();
                if ($user) {
                    $user->google_id = $googleUser->id;
                    $user->save();
                }else {
                    $user = User::create([
                        'full_name' => $googleUser->name,
                        'email' => $googleUser->email,
                        'google_id' => $googleUser->id,
                        'password' => Hash::make(Str::random(10))
                    ]);
                }
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            $frontendUrl = 'http://localhost:5174/google-callback?token=' . $token . '&name=' . $user->full_name;
            return redirect($frontendUrl);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}