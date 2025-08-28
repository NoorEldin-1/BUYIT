<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;

class CommentController extends Controller
{
    public function create($product_id) {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message"=> "product not found"]);
        } else {
            $comment = Comment::create([
                "user_id" => request()->user()->id,
                "product_id" => $product_id,
                "comment" => request("comment"),
            ]);
            return response()->json(["comment" => $comment]);
        }
    }

    public function delete($product_id, $comment_id) {
        $comment = Comment::find($comment_id);
        if (!$comment) {
            return response()->json(["message"=> "comment not found"]);
        } else {
            $user = request()->user();
            if ($user->role == "admin" || $user->id == $comment->user_id) {
                $comment->delete();
                return response()->json(["message"=> "comment deleted"]);
            } else {
                return response()->json(["message"=> "unauthorized"]);
            }
        }
    }

    public function product($product_id) {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["message"=> "product not found"]);
        } else {
            $comments = Comment::where("product_id", $product_id)->with("user")->get();
            return response()->json(["comments"=> $comments]);
        }
    }

    public function user($user_id) {
        $user = request()->user();
        if ($user->role != "admin") {
            return response()->json(["message"=> "unauthorized"]);
        } else {
            $comments = Comment::where("user_id", $user_id)->with("product")->get();
            return response()->json(["comments"=> $comments]);
        }
    }
}
