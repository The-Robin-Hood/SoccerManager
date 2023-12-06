import { trimText } from "@lib/stringManipulation";
import cn from "@lib/utils";
import { type ClassValue } from "clsx";
import React, { useRef, useState } from "react";

import { FontAwesomeIcon, faCheck, faPen, faXmark } from "@components/common/Icons";

const EditableText = ({
  initialText,
  textClassName,
  inputClassName,
}: {
  initialText: string;
  textClassName?: ClassValue;
  inputClassName?: ClassValue;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [error, setError] = useState("");
  const textRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    setError("");
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const text = textRef.current!.value.trim();
    if (text.length === 0) {
      setError("Name cannot be empty");
      return;
    }
    if (text.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    setError("");
    setText(text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <div className='h-5'>
      {isEditing ? (
        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <input
              ref={textRef}
              type='text'
              defaultValue={text}
              onKeyDown={handleKeyPress}
              autoFocus
              className={cn("w-60 border-0 border-b bg-transparent outline-none", inputClassName)}
            />
            <button onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck} className='text-md' />
            </button>
            <button onClick={handleEditToggle}>
              <FontAwesomeIcon icon={faXmark} className='text-md' />
            </button>
          </div>
          <p className='mt-1 text-[12px] text-error'>{error !== "" && error}</p>
        </div>
      ) : (
        <div className='group flex gap-2'>
          <span className={cn(textClassName)}>{trimText(text, 25)}</span>
          <button
            onClick={handleEditToggle}
            className={cn({
              "invisible transform opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100":
                initialText != text,
            })}>
            <FontAwesomeIcon icon={faPen} className='text-sm' />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableText;
