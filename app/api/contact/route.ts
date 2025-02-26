import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Email validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received form data:', body);

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(body);
      console.log('Validation passed:', validatedData);

      // Send email
      const data = await resend.emails.send({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: process.env.EMAIL_USER!,
        replyTo: validatedData.email,
        subject: `Portfolio Contact from ${validatedData.name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `
      });

      console.log('Email sent:', data);

      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (validationError) {
      console.error('Validation error:', validationError);
      if (validationError instanceof z.ZodError) {
        const errorMessages = validationError.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return NextResponse.json(
          { message: 'Validation error', errors: errorMessages },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
