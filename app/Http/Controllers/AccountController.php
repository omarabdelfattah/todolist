<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\traits\Httpresponses;
use App\Models\User;
use App\Http\Requests\login;
use App\Http\Resources\userprofile;

class AccountController extends Controller
{
    use Httpresponses;

    public function login(Request $request){
        try{
            if( auth()->attempt(['email'=>$request->input('email'),'password'=>$request->input('password')]) ){
                $user = auth()->user();
                $token = $user->createToken('auth_token')->plainTextToken;
                return $this->success(
                    new userprofile($user),
                    'Login Success',
                )->withCookie(cookie('jwt',$token, 60*24));
            }
            return $this->error(
                null,
                'email or password is incorrect',
                401
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Login Failed',
                500
            );
        }
    }

    public function logout(){
        try{
            $cookie = \Cookie::forget('jwt');
            auth()->user()->currentAccessToken()->delete();
            return $this->success(
                null,
                'Logout Success',
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Logout Failed',
                500
            );
        }
    }

}
