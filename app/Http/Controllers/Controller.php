<?php

namespace App\Http\Controllers;

use Composer\DependencyResolver\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function sendMessage(Request $request)
    {

        return Redirect::action('contact');
    }
    public function contact()
    {
        return View('contact');
    }
}
