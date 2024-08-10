import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db'; // Adjust the path as needed
import Users from '../../../../models/User'; // Import your User model

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Assuming the request contains name, email, consent, and userId
    const { name, email,  } = await req.json() as {
      name: string;
      email: string;
 
    
    };

    const newUser = new Users({

      name,
      email,
     
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
