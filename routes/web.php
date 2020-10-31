<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('index');
Route::post('/sendMessage', 'Controller@sendMessage')->name('sendMessage');
Route::get('/skills', function () {
    return view('skills');
})->name('skills');
Route::get('/projects', function () {
    return view('projects');
})->name('projects');
Route::get('/contact', function () {
    return view('contact');
})->name(('contact'));
Route::get('/team', function () {
    return view('team');
})->name('team');

Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return view('admin/index');
    });
});
