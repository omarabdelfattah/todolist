<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class permission
{
 
    public function handle(Request $request, Closure $next, $role = null): Response
    {
        if(auth()->user()->role->$role == 0){
            return response()->json([
                'message' => 'You do not have a permission'
            ], 403);
        }else{
            return $next($request);
        }
    }
}
