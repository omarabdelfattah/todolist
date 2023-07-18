<x-mail::message>
    # Task Completed !

    Hello,

    Congratulations! For completing the following task:

    # {{ $task->description }}

    Thank you for using our Todo List app.

    Regards,
    {{ config('app.name') }}
</x-mail::message>
