import axios from '../axios';

const ARCHIVE_BASE_URL = 'https://archive.org/metadata/';
const ARCHIVE_DOWNLOAD_URL = 'https://archive.org/download/';
const DEFAULT_STORE = 'DuHiKhaiPhatCuDauTH';

/**
 * Fetches and processes audio files from archive.org
 * @param {string} storeName - The archive.org identifier
 * @returns {Promise<Array<{url: string, title: string}>>} Array of audio sources with urls and titles
 * @throws {Error} When the API request fails or returns invalid data
 */
export const getAudio = async (storeName = DEFAULT_STORE) => {
  try {
    const response = await axios.get(`${ARCHIVE_BASE_URL}${storeName}`);
    
    if (!response?.data?.files) {
      throw new Error('Invalid response format from Archive.org');
    }

    const audioFiles = response.data.files
      .filter(file => file.format === 'VBR MP3')
      .map(file => {
        const episodeMatch = file.name.match(/^\d+/);
        const title = episodeMatch 
          ? `Tập ${episodeMatch[0].padStart(3, '0')}`
          : file.name;
          
        return {
          url: `${ARCHIVE_DOWNLOAD_URL}${storeName}/${file.name}`,
          title,
        };
      })
      .sort((a, b) => {
        const numA = parseInt(a.title.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.title.replace(/\D/g, '')) || 0;
        return numA - numB;
      });

    if (!audioFiles.length) {
      throw new Error('No audio files found in the archive');
    }

    return audioFiles;
  } catch (error) {
    const message = error.message || 'Failed to fetch audio files';
    throw new Error(message);
  }
}
