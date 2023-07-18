<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class taskresource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->map(function ($item) {    
            return [
                'id' => $item->id,
                'description' => $item->description,
                'completed' => $item->completed ? true : false,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        });
    }
}
