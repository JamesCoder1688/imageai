// Cloudflare Functions API route for image transformation
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client - will be set per request
let genAI;

async function generateGTAStyleImage(imageFile) {
  try {
    // Step 1: Analyze the uploaded image with Gemini
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    
    const imagePart = {
      inlineData: {
        data: base64String,
        mimeType: imageFile.type,
      },
    };

    console.log('Analyzing uploaded image with Gemini...');
    const analysisModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const analysisPrompt = `Analyze this image and describe what you see in detail for creating GTA-style artwork. Focus on:
- Main subject(s) or people in the image
- Setting and environment
- Clothing and accessories
- Facial features and expressions
- Overall composition
- Colors and lighting
Provide a detailed description that can be used to create GTA-style artwork.`;

    const analysisResult = await analysisModel.generateContent([analysisPrompt, imagePart]);
    const imageDescription = analysisResult.response.text();
    console.log('Image analysis complete:', imageDescription);

    // Step 2: Generate GTA-style image using Imagen 4.0
    console.log('Generating GTA-style image with Imagen...');
    
    const gtaPrompt = `Create a GTA (Grand Theft Auto) style artwork based on this description: ${imageDescription}

Style requirements:
- Bold comic book art style with thick outlines
- Vibrant, saturated colors (hot pinks, electric blues, neon greens, bright oranges)
- Cell-shaded/flat coloring technique
- High contrast lighting with dramatic shadows
- Urban street art aesthetic
- Slightly exaggerated proportions and features
- Clean vector art style similar to GTA loading screens
- Professional game art quality
- 80s/90s retro aesthetic with neon colors

Make it look exactly like official GTA character artwork or promotional art.`;

    // Use Imagen 4.0 for actual image generation
    const imageGenModel = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });
    
    const imageGenResult = await imageGenModel.generateContent({
      contents: [{ 
        role: 'user', 
        parts: [{ text: gtaPrompt }] 
      }]
    });

    // Extract generated image from response
    const generatedParts = imageGenResult.response.candidates?.[0]?.content?.parts || [];
    const generatedImagePart = generatedParts.find((part) => part.inlineData?.data);

    if (generatedImagePart && generatedImagePart.inlineData?.data) {
      console.log('GTA-style image generated successfully!');
      return generatedImagePart.inlineData.data;
    }

    // Fallback: return analysis text if image generation fails
    console.log('Image generation failed, returning analysis');
    const fallbackResponse = `🎮 **GTA Style Analysis Complete**\n\n${imageDescription}\n\n---\n\n**Note**: Image generation is in development. This detailed analysis describes how your image would look in GTA style.`;
    return btoa(unescape(encodeURIComponent(fallbackResponse)));
    
  } catch (error) {
    console.error('GTA style generation error:', error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Initialize Gemini client with environment variables
    if (!genAI) {
      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({
          error: 'GEMINI_API_KEY environment variable is not set'
        }), { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      genAI = new GoogleGenerativeAI(apiKey);
    }
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return new Response(JSON.stringify({
        error: 'No image file provided'
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({
        error: 'File must be an image'
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({
        error: 'File size must be less than 10MB'
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Process the image with Gemini
    const resultBase64 = await generateGTAStyleImage(file);

    return new Response(JSON.stringify({
      success: true,
      imageBase64: resultBase64,
      originalFileName: file.name,
      processedAt: new Date().toISOString(),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Transform API error:', error);
    
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Internal server error',
      success: false
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    message: 'GTA AI Transform API',
    status: 'active',
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize: '10MB'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}