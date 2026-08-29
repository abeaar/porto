interface TagsProps {
  tags?: string[];
  className?: string;
}

export default function Tags({ tags, className = "" }: TagsProps) {
  if (!tags?.length) return null;

  return (
    <div className={`portfolio-tag-list ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className="portfolio-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
