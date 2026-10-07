/**
 * Generates downloadable high-resolution social share cards (1080x1080 square and 1080x1920 story)
 * using HTML5 Canvas with Nigerian emerald green, warm gold accents, and bold typography.
 */

export interface ShareCardOptions {
  format: 'square' | 'story'; // 1080x1080 or 1080x1920
  phrase?: string;
  english?: string;
}

export async function generateShareCardBlob(options: ShareCardOptions): Promise<Blob> {
  const isStory = options.format === 'story';
  const width = 1080;
  const height = isStory ? 1920 : 1080;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // 1. Background gradient (Deep Nigerian Emerald to Forest)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#064E3B');
  bgGrad.addColorStop(0.5, '#022C22');
  bgGrad.addColorStop(1, '#011F18');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Decorative Gold geometric border accents
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(55, 55, width - 110, height - 110);

  // Corner gold squares
  const cornerSize = 16;
  ctx.fillStyle = '#D97706';
  ctx.fillRect(40, 40, cornerSize, cornerSize);
  ctx.fillRect(width - 40 - cornerSize, 40, cornerSize, cornerSize);
  ctx.fillRect(40, height - 40 - cornerSize, cornerSize, cornerSize);
  ctx.fillRect(width - 40 - cornerSize, height - 40 - cornerSize, cornerSize, cornerSize);

  // 3. Top Tag / Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F59E0B'; // Warm Gold
  ctx.font = '700 24px -apple-system, sans-serif';
  if ('letterSpacing' in ctx) {
    (ctx as any).letterSpacing = '4px';
  }

  ctx.fillText('GUINNESS WORLD RECORDS™ ATTEMPT', width / 2, isStory ? 180 : 120);

  // 4. Main Event Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 52px -apple-system, sans-serif';
  const titleY = isStory ? 280 : 200;
  ctx.fillText("FAVOUR UGEGBE'S 48-HOUR", width / 2, titleY);
  ctx.fillText('FRENCH LANGUAGE MARATHON', width / 2, titleY + 65);

  // 5. Center Feature: Record Comparison or French Phrase
  if (options.phrase) {
    // Daily Phrase Card
    ctx.fillStyle = '#FEF3C7';
    ctx.font = 'italic 700 48px Georgia, serif';
    ctx.fillText(`“${options.phrase}”`, width / 2, isStory ? 750 : 460);

    if (options.english) {
      ctx.fillStyle = '#A7F3D0';
      ctx.font = '400 32px -apple-system, sans-serif';
      ctx.fillText(options.english, width / 2, isStory ? 840 : 530);
    }
  } else {
    // Standard Marathon Milestone Card
    const boxY = isStory ? 580 : 360;
    const boxH = isStory ? 480 : 340;
    const boxW = width - 180;
    const boxX = 90;

    // Stat Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // 26h vs 48h stats
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 28px -apple-system, sans-serif';
    ctx.fillText('CURRENT RECORD', width / 2 - 200, boxY + 80);
    ctx.fillText('NEW TARGET', width / 2 + 200, boxY + 80);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 80px -apple-system, sans-serif';
    ctx.fillText('26h', width / 2 - 200, boxY + 170);

    ctx.fillStyle = '#F59E0B';
    ctx.fillText('48h', width / 2 + 200, boxY + 170);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 26px -apple-system, sans-serif';
    ctx.fillText('22 HOURS BEYOND THE MARK · ONE EXTRAORDINARY LESSON', width / 2, boxY + 260);
  }

  // 6. Dates, Venue & Entry Info
  const footerY = isStory ? 1400 : 800;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 36px -apple-system, sans-serif';
  ctx.fillText('30 OCTOBER – 1 NOVEMBER 2026', width / 2, footerY);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '600 30px -apple-system, sans-serif';
  ctx.fillText('LANDMARK, LAGOS · ENTRY IS FREE', width / 2, footerY + 50);

  // 7. Social handle & Hashtags
  const bottomY = isStory ? 1720 : 980;
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '500 24px -apple-system, sans-serif';
  ctx.fillText('Follow the journey: @UGEGBEGWR · info@ugegbegwr.com', width / 2, bottomY);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '400 22px -apple-system, sans-serif';
  ctx.fillText('#UgegbeGWR   #FavourNwobodo   #FrenchLanguageMarathon', width / 2, bottomY + 40);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas blob generation failed'));
      }
    }, 'image/png');
  });
}

export async function downloadShareCard(options: ShareCardOptions, filename = 'ugegbe-gwr-card.png') {
  const blob = await generateShareCardBlob(options);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
