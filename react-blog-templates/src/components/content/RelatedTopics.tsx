import React from 'react';

interface RelatedTopicsProps {
  topics: { title: string; description: string }[];
}

const RelatedTopics: React.FC<RelatedTopicsProps> = ({ topics }) => {
  return (
    <div className="left-panel">
      <h3 className="panel-title">More to Explore</h3>
      <div>
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{topic.title}</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTopics; 