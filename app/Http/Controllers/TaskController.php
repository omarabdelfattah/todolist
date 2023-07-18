<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\addTask;
use App\Http\Requests\updateTask;
use App\Http\traits\Httpresponses;
use App\Http\Resources\taskresource;
use App\Mail\finished_task;
class TaskController extends Controller
{
    use Httpresponses;
    public function __construct(){
        $this->middleware('Permission:view',['only' => 'index','show']);
        $this->middleware('Permission:add',['only'=>'store']);
        $this->middleware('Permission:edit',['only'=>'update']);
        $this->middleware('Permission:delete',['only'=>'destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $task = Task::all();
            return $this->success(
                new taskresource($task),
                'Get Tasks Success',
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Get Tasks Failed',
                500
            );
        }
    }

 
    /**
     * Store a newly created resource in storage.
     */
    public function store(addTask $request)
    {
        try{
            $request->merge([
                'user_id' => auth()->user()->id,
            ]);
            $task = Task::create($request->all());
            return $this->success(
                new taskresource(collect([$task])),
                'Add Task Success',
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Add Task Failed',
                500
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $task = Task::find($id);
            return $this->success(
                new taskresource(collect([$task])),
                'Get Task Success',
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Get Task Failed',
                500
            );
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateTask $request, string $id)
    {
        try{
            $task = Task::find($id);
            if(!$task){
                return $this->error(
                    null,
                    'Task Not Found',
                    404
                );
            }
            $task->update($request->all());
            if ($task->wasChanged('completed') && $task->completed == true) {
                $user = User::find($task->user_id);
                \Mail::to($task->user->email)->send(new finished_task($task,));
            }
            return $this->success(
                new taskresource(collect([$task])),
                'Update Task Success',
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Update Task Failed',
                500
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $task = Task::find($id);
            if(!$task){
                return $this->error(
                    null,
                    'Task Not Found',
                    404
                );
            }
            $task->delete();
            return $this->success(
                null,
                'Delete Task Success',
            );
        }catch(\Exception $e){
            return $this->error(
                $e->getMessage(),
                'Delete Task Failed',
                500
            );
        }
    }
}
