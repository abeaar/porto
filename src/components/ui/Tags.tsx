interface TagsProps {
  tags?: string[];
  className?: string;
}

export default function Tags({ tags, className = "" }: TagsProps) {
  if (!tags?.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className="theme-control theme-text tag rounded-full border px-3 py-1">
          {tag}
        </span>
      ))}
    </div>
  );
}
