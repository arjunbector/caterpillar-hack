import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db'; // Adjust the path as needed
import Users from '../../../../models/User'; // Import your User model

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Assuming the request contains name, email, consent, and userId
    const { name, location, locationUrl, contact, machineType, date } = await req.json() as {
      name: string;
      location: string;
      locationUrl?: string;
      contact: string;
      machineType: string;
      date: Date;
    };

    const newUser = new Users({
      name,
      location,
      locationUrl,
      contact,
      machineType,
      date,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User  has been created", userId: newUser._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const users = await Users.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }

}