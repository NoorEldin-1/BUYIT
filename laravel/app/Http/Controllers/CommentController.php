<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $comment = new Comment();
            $comment->user_id = Auth::id();
            $comment->product_id = $request->product_id;
            $comment->comment = $request->comment;
            $comment->save();

            return response()->json([
                'success' => true,
                'message' => 'Comment created successfully',
                'comment' => $comment->load('user')
            ], 201);
            
        } catch (\Exception $e) {
            Log::error('Error creating comment: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create comment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function delete($product_id, $comment_id) {
        $comment = Comment::where("product_id", $product_id)->where("user_id", request()->user()->id)->where("id", $comment_id)->first();
        if (!$comment) {
            return response()->json(["message"=> "comment not found"]);
        } else {
            $comment->delete();
            return response()->json(["message"=> "comment deleted"]);
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
}
