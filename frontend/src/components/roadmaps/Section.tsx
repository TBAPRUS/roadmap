import React from 'react';

interface SectionProps {
  auth: boolean;
  title: string;
  text: string;
  change: boolean;
  handleChangeSectionTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSectionText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateSection: () => void;
  handleDeleteSection: () => void;
}

export const Section: React.FC<SectionProps> = ({
  auth,
  title,
  text,
  change,
  handleChangeSectionTitle,
  handleChangeSectionText,
  handleUpdateSection,
  handleDeleteSection,
}) => (
  <div className="section">
    {auth ? (
      <input
        className="title"
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        autoComplete="off"
        onChange={handleChangeSectionTitle}
      />
    ) : (
      <h2>{title}</h2>
    )}
    {auth ? (
      <input
        className="text"
        type="text"
        name="text"
        placeholder="Text"
        value={text}
        autoComplete="off"
        onChange={handleChangeSectionText}
      />
    ) : (
      <p>{text}</p>
    )}
    {change && auth && <button onClick={handleUpdateSection}>Update</button>}
    {auth && <button onClick={handleDeleteSection}>Delete</button>}
  </div>
);
