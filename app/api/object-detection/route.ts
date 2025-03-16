import { NextResponse } from 'next/server';
import axios from 'axios';

const EDEN_AI_API_KEY = process.env.EDEN_AI_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Image URL is required' },
        { status: 400 }
      );
    }

    if (!EDEN_AI_API_KEY) {
      console.error('EDEN_AI_API_KEY is not configured');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await axios.post(
      'https://api.edenai.run/v2/image/object_detection',
      {
        providers: 'amazon,google',
        file_url: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${EDEN_AI_API_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in object detection:', error);
    return NextResponse.json(
      { 
        message: 'Failed to process image',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}