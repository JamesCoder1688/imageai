import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Imagen 4 API endpoint for image generation (not currently used)
// const IMAGE_GEN_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage';

export async function generateGTAStyleImage(imageFile: File): Promise<string> {
  try {
    // 转换文件为base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64String = Buffer.from(bytes).toString('base64');
    
    // 第一步：分析原始图片
    console.log('开始分析上传的图片...');
    const analysisModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const analysisPrompt = `请详细分析这张图片，重点描述：
    - 主要对象或人物
    - 场景和环境设定
    - 色彩和光照效果
    - 构图和风格特点
    
    请用简洁但详细的语言描述，以便后续进行GTA风格转换。`;

    const imagePart = {
      inlineData: {
        data: base64String,
        mimeType: imageFile.type,
      },
    };

    const analysisResult = await analysisModel.generateContent([analysisPrompt, imagePart]);
    const imageDescription = analysisResult.response.text();
    console.log('图片分析完成:', imageDescription);

    // 第二步：使用Gemini 2.5 Flash Image生成GTA风格图片
    console.log('开始生成GTA风格图片...');
    const imageGenModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image-preview' });
    
    const gtaPrompt = `基于以下图片描述，创建一张GTA (Grand Theft Auto) 风格的艺术作品：

原始图片描述：${imageDescription}

请应用以下GTA视觉特征：
- 鲜艳饱和的色彩，充满活力
- 锐利的卡通风格轮廓和cel-shading效果
- 干净的矢量艺术风格，类似GTA加载界面
- 戏剧性的光照和阴影对比
- 风格化的比例和特征
- 明暗区域的高对比度
- 平滑的渐变和清晰的线条
- 专业游戏艺术质量
- 80/90年代复古美学和霓虹色彩

最终结果应该看起来像官方GTA角色艺术或宣传图像。`;

    // 使用正确的API调用方式
    const imageGenResult = await imageGenModel.generateContent(gtaPrompt);

    // 查找生成的图片数据
    const generatedParts = imageGenResult.response.candidates?.[0]?.content?.parts || [];
    const generatedImagePart = generatedParts.find((part: { inlineData?: { data?: string } }) => part.inlineData?.data);

    if (generatedImagePart && generatedImagePart.inlineData?.data) {
      console.log('GTA风格图片生成成功!');
      return generatedImagePart.inlineData.data;
    } else {
      console.log('未找到生成的图片，返回分析结果');
      return `🎨 **GTA风格分析完成**\n\n${imageDescription}\n\n*图片生成功能正在调试中，当前仅显示分析结果...*`;
    }

  } catch (error) {
    console.error('Error generating GTA style image:', error);
    throw new Error('Failed to process image. Please try again.');
  }
}

export async function analyzeImage(imageFile: File): Promise<string> {
  try {
    const arrayBuffer = await imageFile.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64String = Buffer.from(bytes).toString('base64');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `
    Analyze this image and describe what you see. Focus on:
    - Main subjects or people in the image
    - Setting and background
    - Colors and lighting
    - Style and composition
    - Any notable features or details
    
    Provide a detailed but concise description.
    `;

    const imagePart = {
      inlineData: {
        data: base64String,
        mimeType: imageFile.type,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image.');
  }
}