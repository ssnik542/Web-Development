import { NextResponse } from "next/server";
import { dbConnect } from '../../../database/db'
import { Product } from '../../../database/product.model.js'
export async function GET(req, res) {
    let data = []
    try {
        await dbConnect()
        data = await Product.find()
    } catch (error) {
        data = { success: false }
    }
    // const queryString = req.url.split('?')[1];
    // const page = Number(new URLSearchParams(queryString).get('page')) || 1;
    // const limit = Number(new URLSearchParams(queryString).get('limit')) || 1;
    return NextResponse.json({
        data
    }, { status: 200 })

}

export async function POST(req, res) {
    await dbConnect();
    const response = await req.json()
    const data = new Product(response)
    const result = await data.save()
    return NextResponse.json({
        result,
        success: "true"
    }, { status: 200 })
}

export async function PUT(req, res) {

}
