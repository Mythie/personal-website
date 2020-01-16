import React, { useEffect, useState, useMemo } from 'react';

import './Typing.css';

const sleep = (timeout) => new Promise((r) => setTimeout(r, timeout));

const Typing = (props) => {
  const {
    phrases, interval = 150, tag: Tag = 'p', delay = 700,
  } = props;

  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const computedPhrases = (typeof phrases === 'string' ? [phrases] : phrases);

  const currentPhrase = computedPhrases[currentPhraseIndex];

  const type = async () => {
    if (typedText === currentPhrase) {
      await sleep(delay);

      setTypedText('');
      setCurrentPhraseIndex((currentPhraseIndex + 1) % computedPhrases.length);
    } else {
      setTypedText(currentPhrase.slice(0, typedText.length + 1));
    }
  };

  useEffect(() => {
    const id = setTimeout(type, interval);

    return () => clearTimeout(id);
  }, [typedText, setTypedText]);

  return (
    <Tag {...props}>
      {typedText}
      <span className="Typing--blinker">|</span>
    </Tag>
  );
};

export default Typing;
