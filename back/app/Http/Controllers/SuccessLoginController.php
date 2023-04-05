<?php

namespace App\Http\Controllers;

use App\Models\SuccessLogin;
use Illuminate\Http\Request;

/**
 * Class SuccessLoginController
 * @package App\Http\Controllers
 */
class SuccessLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $successLogins = SuccessLogin::paginate();

        return view('success-login.index', compact('successLogins'))
            ->with('i', (request()->input('page', 1) - 1) * $successLogins->perPage());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $successLogin = new SuccessLogin();
        return view('success-login.create', compact('successLogin'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(SuccessLogin::$rules);

        $successLogin = SuccessLogin::create($request->all());

        return redirect()->route('success-logins.index')
            ->with('success', 'SuccessLogin created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $successLogin = SuccessLogin::find($id);

        return view('success-login.show', compact('successLogin'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $successLogin = SuccessLogin::find($id);

        return view('success-login.edit', compact('successLogin'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  SuccessLogin $successLogin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SuccessLogin $successLogin)
    {
        request()->validate(SuccessLogin::$rules);

        $successLogin->update($request->all());

        return redirect()->route('success-logins.index')
            ->with('success', 'SuccessLogin updated successfully');
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $successLogin = SuccessLogin::find($id)->delete();

        return redirect()->route('success-logins.index')
            ->with('success', 'SuccessLogin deleted successfully');
    }
}
