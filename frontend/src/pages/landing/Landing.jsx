// TODO: Should we have backslash commands such as \clear to clear convo and more??

import { useState, useEffect } from 'react';
import {
  ChevronDoubleRightIcon,
  XMarkIcon,
  ArrowRightEndOnRectangleIcon,
//   ChevronDoubleLeftIcon,
} from '@heroicons/react/24/solid'


export const Landing = () => {
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState([]);

  const [globalKeywords, setGlobalKeywords] = useState([]);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // TODO: conversation value needs to change to 
      // know if it came from the user or AI generated response
      e.preventDefault();
      setConversation([...conversation, inputValue]);
      setInputValue('');
      setKeywords([]);
    } else {
      const currentInput = e.target.value.trim();
      const newKeywords = currentInput.split(' ');
      // TODO: get AI response for keywords from the current input here
      setKeywords(newKeywords);
    }

    // TODO: Get AI response here
  };

  const handleClearInput = () => {
    setInputValue('');
    setKeywords([]);
  };

  useEffect(() => {
    fetch('http://localhost:3002/api/keywords')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch keywords');
            }

            return response.json();
        })
        .then(data => {
            const keywords = data[0].keywords
            const parsedJSON = JSON.parse(keywords)
            setGlobalKeywords(parsedJSON.keywords);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }, []);

  const listConversations = conversation.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  const listKeywords = keywords.map((keyword, index) => (
    <div className='pill' key={index}>
      <p>{keyword}</p>
    </div>
  ));

  return (
    <div className="page_container relative overflow-auto">
      <div className="absolute top-0 left-0 w-full h-full z-[2]">
        <div className="w-full min-h-full max-w-[700px] mx-auto pt-[48px]">
        {listConversations}
        </div>
      </div>
      
      <div className='fixed left-0 bottom-0 w-full z-[3]'>
        <div className="min-h-[100px] w-full max-w-[700px] mx-auto bg-primary_bg pb-[24px] z-[3]">
            <label 
              htmlFor='chat-input-prompt'
              className='flex items-center gap-[8px]'
            >
              <ChevronDoubleRightIcon className='w-[12px] h-[12px]'/>
              <small>What kind of software are you hunting for?</small>
            </label>
            <div className='pl-[25px] mt-[10px]'>
              <div className='border-b flex items-center gap-[12px] pb-[4px]'>
                <input 
                id='chat-input-prompt'
                name='chat-input-prompt'
                type="text" 
                className='w-full outline-none bg-transparent'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                  />
                <button className='p-[6px]' onClick={handleClearInput}>
                  <XMarkIcon className='w-[12px] h-[12px]'/>
                </button>
              </div>
            </div>
            <div className='mt-[12px] flex items-center flex-wrap pl-[25px] min-h-[26px] gap-[6px]'>
              {listKeywords}
              <div className='flex items-center gap-[6px]'>
                <small className='whitespace-nowrap'>press <strong>Enter</strong></small>
                <ArrowRightEndOnRectangleIcon className='w-[16px] h-[16px]'/>
              </div>
            </div>
        </div>
      </div>

      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1]' >
        <h1 className='text-[128px] text-primary_white/20'>OAS</h1>
      </div>
    </div>
  )
}