import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { HiShare } from 'react-icons/hi';
import { FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa';

interface ShareButtonProps {
  archetypeName: string;
  matchPercentage: number;
  tagline: string;
}

export const ShareButton = ({ archetypeName, matchPercentage, tagline }: ShareButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `I just discovered my training soul! I'm a ${archetypeName} (${matchPercentage}% match) - ${tagline}. Find yours at 2HLABS!`;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowMenu(false);
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowMenu(false);
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setShowMenu(false);
        }, 2000);
        return;
      }

      // Fallback to legacy method
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setShowMenu(false);
        }, 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
      setCopyError(true);
      setTimeout(() => {
        setCopyError(false);
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="lg"
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2"
      >
        <HiShare />
        <span>Share My Results</span>
      </Button>

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

            {/* Share Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-dark-lighter border-2 border-primary/30 rounded-xl p-4 shadow-2xl z-50 w-64"
            >
              <p className="text-sm text-gray-400 mb-3 text-center">Share on</p>

              <div className="space-y-2">
                <button
                  onClick={handleTwitterShare}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-[#1DA1F2]/20 border border-dark-light hover:border-[#1DA1F2] transition-colors"
                >
                  <FaTwitter className="text-[#1DA1F2]" size={20} />
                  <span className="text-white">Twitter</span>
                </button>

                <button
                  onClick={handleFacebookShare}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-[#1877F2]/20 border border-dark-light hover:border-[#1877F2] transition-colors"
                >
                  <FaFacebook className="text-[#1877F2]" size={20} />
                  <span className="text-white">Facebook</span>
                </button>

                <button
                  onClick={handleLinkedInShare}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark hover:bg-[#0A66C2]/20 border border-dark-light hover:border-[#0A66C2] transition-colors"
                >
                  <FaLinkedin className="text-[#0A66C2]" size={20} />
                  <span className="text-white">LinkedIn</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark border transition-colors ${
                    copyError
                      ? 'border-red-500 hover:border-red-500'
                      : 'border-dark-light hover:bg-primary/20 hover:border-primary'
                  }`}
                >
                  <FaLink className={copyError ? 'text-red-500' : 'text-primary'} size={20} />
                  <span className="text-white">
                    {copyError ? 'Failed to copy' : copied ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
