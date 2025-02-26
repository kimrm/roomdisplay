<?php

namespace App\Http\Controllers\Admin;

use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Customers/Index', [
            'customersPaginate' => CustomerResource::collection(Customer::paginate()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return inertia('Admin/Customers/Show', [
            'customerResponse' => new CustomerResource($customer),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return inertia('Admin/Customers/Edit', [
            'customer' => new CustomerResource($customer),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
