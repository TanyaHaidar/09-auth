"use client";

export default function NoteError({ error }: { error: Error }) {
  return (
    <div>
      <h2>Failed to load note</h2>
      <p>{error.message}</p>
    </div>
  );
}
