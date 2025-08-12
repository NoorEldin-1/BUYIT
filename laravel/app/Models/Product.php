<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'info', 'price', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function saves()
    {
        return $this->hasMany(Save::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
