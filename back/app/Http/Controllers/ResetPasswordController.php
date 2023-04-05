<?php

namespace App\Http\Controllers;

use App\Models\ResetPassword;
use Illuminate\Http\Request;

/**
 * Class ResetPasswordController
 * @package App\Http\Controllers
 */
class ResetPasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resetPasswords = ResetPassword::paginate();

        return view('reset-password.index', compact('resetPasswords'))
            ->with('i', (request()->input('page', 1) - 1) * $resetPasswords->perPage());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $resetPassword = new ResetPassword();
        return view('reset-password.create', compact('resetPassword'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(ResetPassword::$rules);

        $resetPassword = ResetPassword::create($request->all());

        return redirect()->route('reset-passwords.index')
            ->with('success', 'ResetPassword created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $resetPassword = ResetPassword::find($id);

        return view('reset-password.show', compact('resetPassword'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $resetPassword = ResetPassword::find($id);

        return view('reset-password.edit', compact('resetPassword'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  ResetPassword $resetPassword
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ResetPassword $resetPassword)
    {
        request()->validate(ResetPassword::$rules);

        $resetPassword->update($request->all());

        return redirect()->route('reset-passwords.index')
            ->with('success', 'ResetPassword updated successfully');
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $resetPassword = ResetPassword::find($id)->delete();

        return redirect()->route('reset-passwords.index')
            ->with('success', 'ResetPassword deleted successfully');
    }
}
