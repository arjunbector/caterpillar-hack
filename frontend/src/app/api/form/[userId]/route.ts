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
