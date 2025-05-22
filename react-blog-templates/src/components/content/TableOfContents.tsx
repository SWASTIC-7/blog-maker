import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="right-panel">
      <h3 className="panel-title">Table of Contents</h3>
      <nav>
        {headings.map(({ id, text, level }) => (
          <div
            key={id}
            className={`toc-item ${activeId === id ? 'active' : ''}`}
            style={{ paddingLeft: `${(level - 1) * 1}rem` }}
            onClick={() => scrollToHeading(id)}
          >
            {text}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents; 