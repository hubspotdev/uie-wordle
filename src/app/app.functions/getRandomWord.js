exports.main = async (context = {}) => {
  try {
    console.log('Fetching random word...');

    const response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const [word] = data;

    // Validate the word
    if (!word || !/^[a-zA-Z]+$/.test(word)) {
      throw new Error('Invalid word received');
    }

    console.log('Successfully fetched word:', word);

    return {
      status: 'SUCCESS',
      body: {
        word: word.toUpperCase()
      }
    };

  } catch (error) {
    console.error('Error in getRandomWord:', error);

    return {
      status: 'ERROR',
      body: {
        error: error.message,
        word: 'REACT' // Fallback word
      }
    };
  }
};
