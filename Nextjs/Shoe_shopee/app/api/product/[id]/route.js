import { NextResponse } from "next/server";
import { dbConnect } from '../../../../database/db'
import { Product } from '../../../../database/product.model.js'
export async function GET(req, res) {
    const id = res.params.id
    let data;
    try {
        await dbConnect()
        data = await Product.findById(id)
    } catch (error) {
        data = { success: false }
    }
    return NextResponse.json({
        data
    }, { status: 200 })

}

export async function PUT(req, res) {
    let payload = await req.json();
    console.log(res.params.id)
    return NextResponse.json({
        message: 'update successfully',
        success: true
    }, { status: 200 })
}