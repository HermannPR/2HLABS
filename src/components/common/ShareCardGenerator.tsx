import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { HiShare, HiDownload } from 'react-icons/hi';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import type { Archetype } from '../../types';

interface ShareCardGeneratorProps {
  archetype: Archetype;
  matchPercentage: number;
}

// Soul colors mapping (same as AllSouls.tsx)
const SOUL_COLORS: Record<string, string> = {
  'gorilla-rage': '#FF5722',
  'dragon-blood': '#8B0000',
  'cheetah-sprint': '#FFFF00',
  'eagle-vision': '#00D4FF',
  'titan-strength': '#708090',
  'phoenix-rise': '#FF6600',
  'serpent-flow': '#00FF88',
  'wolf-pack': '#90EE90',
  'mantis-focus': '#32CD32',
  'viper-strike': '#00FF00',
  'bear-endurance': '#8B4513',
  'thunder-strike': '#9933FF',
  'lion-heart': '#FFD700',
};

const getSoulLogo = (id: string) => `/assets/souls/${id}.png`;

export const ShareCardGenerator = ({ archetype, matchPercentage }: ShareCardGeneratorProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [generating, setGenerating] = useState(false);

  const brandColor = SOUL_COLORS[archetype.id] || '#00e5ff';

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 229, b: 255 };
  };

  const rgb = hexToRgb(brandColor);

  const generateImage = async (): Promise<string> => {
    if (!cardRef.current) throw new Error('Card ref not found');

    setGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1080,
        height: 1080,
      });
      return dataUrl;
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const dataUrl = await generateImage();
      const link = document.createElement('a');
      link.download = `${archetype.id}-soul-2hlabs.png`;
      link.href = dataUrl;
      link.click();
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const handleShare = async (platform: 'twitter' | 'facebook' | 'instagram' | 'native') => {
    try {
      const dataUrl = await generateImage();

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${archetype.id}-soul.png`, { type: 'image/png' });

      if (platform === 'native' && navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `My Training Soul: ${archetype.name}`,
          text: `I discovered my training soul! I'm ${archetype.name} - ${archetype.tagline} ⚡`,
        });
        setShowMenu(false);
        return;
      }

      // Fallback to platform-specific sharing (just opens with text, image download required)
      const shareText = encodeURIComponent(
        `I discovered my training soul! I'm ${archetype.name} - ${archetype.tagline} ⚡ Find yours at 2HLABS!`
      );
      const shareUrl = encodeURIComponent(window.location.href);

      let url = '';
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
          break;
        case 'instagram':
          // Instagram doesn't support web sharing, just download the image
          await handleDownload();
          alert('Image downloaded! Share it on Instagram from your device.');
          return;
      }

      if (url) {
        window.open(url, '_blank', 'width=550,height=420');
      }
      setShowMenu(false);
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <div className="relative">
      {/* Hidden Card for Image Generation */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <div
          ref={cardRef}
          style={{
            width: '1080px',
            height: '1080px',
            background: `linear-gradient(135deg, #0a0a0a 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2) 100%)`,
            padding: '80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Background Glow Effect */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800px',
              height: '800px',
              background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3) 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />

          {/* Header */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #00e5ff, #00b8cc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
              }}
            >
              2HLABS
            </div>
            <div style={{ fontSize: '32px', color: '#999', marginBottom: '10px' }}>
              MY TRAINING SOUL
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Soul Logo */}
            <img
              src={getSoulLogo(archetype.id)}
              alt={archetype.name}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'contain',
                filter: `drop-shadow(0 0 60px ${brandColor}) drop-shadow(0 0 30px ${brandColor})`,
                marginBottom: '40px',
              }}
            />

            {/* Soul Name */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: brandColor,
                marginBottom: '20px',
                letterSpacing: '2px',
              }}
            >
              {archetype.name}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: '36px',
                color: '#fff',
                marginBottom: '30px',
                fontWeight: '600',
              }}
            >
              {archetype.tagline}
            </div>

            {/* Match Percentage */}
            <div
              style={{
                fontSize: '42px',
                color: brandColor,
                fontWeight: 'bold',
                padding: '15px 40px',
                border: `3px solid ${brandColor}`,
                borderRadius: '50px',
                background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
              }}
            >
              {matchPercentage}% MATCH
            </div>
          </div>

          {/* Footer */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '28px', color: '#666', marginBottom: '15px' }}>
              Discover your training soul at
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#00e5ff',
              }}
            >
              2HLABS.COM
            </div>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <Button
        variant="outline"
        size="lg"
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2"
        disabled={generating}
      >
        <HiShare />
        <span>{generating ? 'Generating...' : 'Share as Image'}</span>
      </Button>

      {/* Share Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />

            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-dark-lighter border-2 border-primary/30 rounded-xl p-4 shadow-2xl z-50 w-64"
            >
              <p className="text-sm text-gray-400 mb-3 text-center">Share your result</p>

              <div className="space-y-2">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-primary/20 border border-dark-light hover:border-primary transition-colors"
                >
                  <HiDownload className="text-primary" size={20} />
                  <span className="text-white">Download Image</span>
                </button>

                <button
                  onClick={() => handleShare('native')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-primary/20 border border-dark-light hover:border-primary transition-colors"
                >
                  <HiShare className="text-primary" size={20} />
                  <span className="text-white">Share (Native)</span>
                </button>

                <button
                  onClick={() => handleShare('instagram')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-[#E1306C]/20 border border-dark-light hover:border-[#E1306C] transition-colors"
                >
                  <FaInstagram className="text-[#E1306C]" size={20} />
                  <span className="text-white">Instagram</span>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-[#1DA1F2]/20 border border-dark-light hover:border-[#1DA1F2] transition-colors"
                >
                  <FaTwitter className="text-[#1DA1F2]" size={20} />
                  <span className="text-white">Twitter</span>
                </button>

                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-[#1877F2]/20 border border-dark-light hover:border-[#1877F2] transition-colors"
                >
                  <FaFacebook className="text-[#1877F2]" size={20} />
                  <span className="text-white">Facebook</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
