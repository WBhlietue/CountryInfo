<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function ()
{
    return view('welcome');
});
Route::post("/test", function ()
{
    return json_encode(["suga" => "suga"]);
});
Route::get("/countries", function ()
{
    $data = DB::select("select * from Country");
    return json_encode($data);
});

Route::post("/countries", function (Request $request)
{
    try {
        $data = $request->all();
        $num = DB::select("select * from Country where officialName=?", [$data["officialName"]]);
    
        if (count($num) == 0) {
            DB::insert("insert into Country (officialName, svg, region, subregion, startOfWeek, population, area, fifa, capital, timezones, map, cca2) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                $data["officialName"], $data["svg"], $data["region"], $data["subregion"], $data["startOfWeek"], $data["population"], $data["area"], $data["fifa"], $data["capital"], $data["timezones"], $data["map"],$data["cca2"]
            ]);
        }
    
        return json_encode(["hi" => $data]);
    } catch (\Exception $e) {
        return json_encode(["error" => $e->getMessage(), "hi" => $data]);
    }
});

Route::get("/countries/{id}", function($id){
    return json_encode(DB::select("select * from Country where cca2=?", [$id]));
});

Route::put("/countries/{id}", function(Request $request, $id){
    try {
        $data = $request->all();
    
        DB::update("update Country set officialName=? ,region=?,subregion=?,startOfWeek=?,population=?, area=?, fifa=?, capital=?, timezones=? where cca2=?", [
            $data["officialName"],  $data["region"], $data["subregion"], $data["startOfWeek"], $data["population"], $data["area"], $data["fifa"], $data["capital"], $data["timezones"], $id
        ]);
    
        return json_encode(["hi" => "hu"]);
    } catch (\Exception $e) {
        return json_encode(["error" => $e->getMessage()]);
    }
});

Route::delete("/countries/{id}", function($id){
    DB::delete("delete from Country where cca2=?", [$id]);
    return json_encode(["hi"=>"hu"]);
});
