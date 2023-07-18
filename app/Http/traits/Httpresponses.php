<?php 

namespace App\Http\traits;

use Illuminate\Http\Response;

trait Httpresponses {

    protected function success($data, $message = null,  $code = 200 , $paginate = false)
    {
        
        $res = [
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ];

        if($paginate){
            $res['pagination'] = [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'next_page_url' => $data->nextPageUrl(),
                'last_page_url' => $data->previousPageUrl(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem()
            ];
        }
         return response()->json($res, $code);
    }

    protected function error($data, $message = null, $code = 500)
    {
        return response()->json([
            'status' => 'Oops, Error has occcured !',
            'message' => $message,
            'data' => $data,
        ], $code);
    }
}