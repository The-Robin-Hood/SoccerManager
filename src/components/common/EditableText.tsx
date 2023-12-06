import React, { useRef, useState } from "react";
import { type ClassValue } from "clsx";
import cn from "@lib/utils";
import {
  FontAwesomeIcon,
  faCheck,
  faPen,
  faXmark,
} from "@components/common/Icons";
import { trimText } from "@lib/stringManipulation";
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
    <div className="h-5">
      {isEditing ? (
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              ref={textRef}
              type="text"
              defaultValue={text}
              onKeyDown={handleKeyPress}
              autoFocus
              className={cn(
                "border-0 border-b bg-transparent outline-none w-60",
                inputClassName
              )}
            />
            <button onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck} className="text-md" />
            </button>
            <button onClick={handleEditToggle}>
              <FontAwesomeIcon icon={faXmark} className="text-md" />
            </button>
          </div>
          <p className="text-[12px] text-error mt-1">{error !== "" && error}</p>
        </div>
      ) : (
        <div className="group flex gap-2">
          <span className={cn(textClassName)}>{trimText(text,25)}</span>
          <button
            onClick={handleEditToggle}
            className={cn({
              "transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300":
                initialText != text,
            })}
          >
            <FontAwesomeIcon icon={faPen} className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableText;
