"use client";

import { MDXRemote } from "next-mdx-remote";

const SongLyrics = ({ lyrics }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...lyrics} />
    </div>
  );
};

export default SongLyrics;
