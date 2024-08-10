import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Forms from '../../../../../models/Form';
import Users from '../../../../../models/User';

interface FormInput {
  sections: {
    [key: string]: Record<string, any>; // Nested object structure
  };
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();

    const { userId } = params;
    const { sections } = await req.json() as FormInput;

    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const newForm = new Forms({
      user: user._id,
      sections,
    });

    await newForm.save();

    return NextResponse.json(
      { message: "Form data has been saved successfully", formId: newForm._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}


export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();

    const { userId } = params;

    // Find the user to ensure they exist
    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Find the form associated with the user
    const form = await Forms.findOne({ user: user._id }).exec();
    if (!form) {
      return NextResponse.json(
        { message: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { form },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}