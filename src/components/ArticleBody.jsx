function renderLine(line, index) {
  const trimmedLine = line.trim();

  if (!trimmedLine) {
    return null;
  }

  if (trimmedLine.startsWith('### ')) {
    return (
      <h3 key={`${trimmedLine}-${index}`} className="mb-4 mt-8 text-2xl font-semibold text-white">
        {trimmedLine.replace(/^###\s+/, '')}
      </h3>
    );
  }

  if (trimmedLine.startsWith('## ')) {
    return (
      <h2 key={`${trimmedLine}-${index}`} className="mb-5 mt-10 text-3xl font-semibold text-white">
        {trimmedLine.replace(/^##\s+/, '')}
      </h2>
    );
  }

  if (trimmedLine.startsWith('# ')) {
    return (
      <h2 key={`${trimmedLine}-${index}`} className="mb-5 mt-10 text-4xl font-semibold text-white">
        {trimmedLine.replace(/^#\s+/, '')}
      </h2>
    );
  }

  return (
    <p key={`${trimmedLine}-${index}`} className="mb-7">
      {trimmedLine}
    </p>
  );
}

export default function ArticleBody({ content, className = '' }) {
  return (
    <div className={className}>
      {content.split('\n').map((line, index) => renderLine(line, index))}
    </div>
  );
}
